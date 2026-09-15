const origin = "https://www.masteringobservability.com";
const concurrency = 6;

function decode(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function match(html, patterns) {
  for (const pattern of patterns) {
    const found = html.match(pattern);
    if (found) return decode(found[1]);
  }
  return "";
}

function normalise(url) {
  try {
    const value = new URL(url, origin);
    if (value.origin !== origin) return null;
    value.hash = "";
    value.search = "";
    return value.href.replace(/\/$/, "") || origin;
  } catch {
    return null;
  }
}

async function pool(items, worker) {
  const output = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return output;
}

async function inspect(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "MasteringObservabilityBaselineAudit/1.0" },
      signal: AbortSignal.timeout(30000),
    });
    const html = await response.text();
    const title = match(html, [/<title[^>]*>([\s\S]*?)<\/title>/i]);
    const description = match(html, [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description/i,
    ]);
    const canonical = match(html, [
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i,
      /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical/i,
    ]);
    const robots = match(html, [
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)/i,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots/i,
    ]);
    const links = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)]
      .map((item) => normalise(item[1]))
      .filter(Boolean);
    return {
      url,
      status: response.status,
      finalUrl: response.url,
      title,
      description,
      canonical,
      robots,
      h1Count: (html.match(/<h1\b/gi) || []).length,
      jsonLdBlocks: (html.match(/application\/ld\+json/gi) || []).length,
      bytes: html.length,
      links: [...new Set(links)],
    };
  } catch (error) {
    return { url, status: 0, error: error.message, links: [] };
  }
}

const sitemapResponse = await fetch(`${origin}/sitemap.xml`, {
  headers: { "user-agent": "MasteringObservabilityBaselineAudit/1.0" },
});
const sitemap = await sitemapResponse.text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((item) => decode(item[1]));
const pages = await pool(sitemapUrls, inspect);
const linkedUrls = [...new Set(pages.flatMap((page) => page.links))];
const sitemapSet = new Set(sitemapUrls.map(normalise));
const nonSitemapLinks = linkedUrls.filter((url) => !sitemapSet.has(url));
const linkChecks = await pool(nonSitemapLinks, async (url) => {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": "MasteringObservabilityBaselineAudit/1.0" },
      signal: AbortSignal.timeout(20000),
    });
    return { url, status: response.status, finalUrl: response.url };
  } catch (error) {
    return { url, status: 0, error: error.message };
  }
});

const duplicateGroups = (field) => Object.entries(
  pages.reduce((groups, page) => {
    const value = page[field];
    if (!value) return groups;
    (groups[value] ||= []).push(page.url);
    return groups;
  }, {})
).filter(([, urls]) => urls.length > 1).map(([value, urls]) => ({ value, urls }));

const summary = {
  capturedAt: new Date().toISOString(),
  sitemapStatus: sitemapResponse.status,
  sitemapUrls: sitemapUrls.length,
  crawled: pages.length,
  statusCounts: pages.reduce((counts, page) => {
    counts[page.status] = (counts[page.status] || 0) + 1;
    return counts;
  }, {}),
  issues: {
    non200: pages.filter((page) => page.status !== 200).map(({ url, status, error }) => ({ url, status, error })),
    missingTitle: pages.filter((page) => !page.title).map((page) => page.url),
    missingDescription: pages.filter((page) => !page.description).map((page) => page.url),
    missingCanonical: pages.filter((page) => !page.canonical).map((page) => page.url),
    canonicalMismatch: pages.filter((page) => page.canonical && normalise(page.canonical) !== normalise(page.url)).map(({ url, canonical }) => ({ url, canonical })),
    h1NotOne: pages.filter((page) => page.h1Count !== 1).map(({ url, h1Count }) => ({ url, h1Count })),
    noStructuredData: pages.filter((page) => page.jsonLdBlocks === 0).map((page) => page.url),
    duplicateTitles: duplicateGroups("title"),
    duplicateDescriptions: duplicateGroups("description"),
    brokenInternalLinks: linkChecks.filter((item) => item.status === 0 || item.status >= 400),
    redirectedInternalLinks: linkChecks.filter((item) => item.status >= 300 && item.status < 400),
  },
  largestPages: pages.slice().sort((a, b) => b.bytes - a.bytes).slice(0, 10).map(({ url, bytes }) => ({ url, bytes })),
};

console.log(JSON.stringify(summary, null, 2));
