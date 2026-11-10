# Event screens: wallpaper, lock screen, screensaver

These are for Al's laptop at in-person events. If someone glances at the
screen, they should see Mastering Observability and have one thing to do:
scan the code.

- **Produced by:** `Design_Standards/producers/mo_event_screen.js` 1.0.0.
- **Tokens:** `design-tokens.json` 3.6.0.
- **Lane and mode:** light, house lane. Al ruled this on 2026-10-13.
- **Spec:** `event_screen_kit.json` in this folder. Edit the spec and re-run.
  Never edit the PNGs.

## Files

| Folder | What | On Al's laptop |
|---|---|---|
| `wallpaper/` | Desktop background: ring mark, house wordmark, domain. Nothing else, because Al works on top of it. | `event-wallpaper_2880x1800.png` |
| `lock_screen/` | Lock screen: claim C01, the house lockup, and a QR code to The Signal sign-up. | `event-lock_2880x1800.png` |
| `screensaver/<size>/` | Four frames, each with one message and one QR code: 01 newsletter, 02 book (free chapter), 03 podcast, 04 claim C22. | the `2880x1800` folder |
| `source/book_cover.png` | The book cover used on frame 02. | |
| `event-screen-kit_manifest.json` | One entry per file: QR version and module size, the URL each code holds, minimum contrast, and sign-in overlaps. | |

**Sizes**

- 3840x2160 and 1920x1080 (16:9) are for an external screen or a stand.
- 2560x1600 and 2880x1800 (16:10) are for the laptop. 2880x1800 is its native resolution.

**Use the 16:10 files on the laptop.** Windows fills the screen, so a 16:9
file on this 16:10 panel loses its sides. The producer lays out each size
separately. None of them is a crop of another.

## How to set each one (Windows 11)

### Desktop wallpaper
1. Go to Settings > Personalisation > Background.
2. Set **Personalise your background** to **Picture**, then choose **Browse photos** and pick `wallpaper/event-wallpaper_2880x1800.png`.
3. Set **Choose a fit for your desktop image** to **Fill**.

### Lock screen (do this one first)
1. Go to Settings > Personalisation > Lock screen.
2. Set **Personalise your lock screen** to **Picture**, then choose **Browse photos** and pick `lock_screen/event-lock_2880x1800.png`.
3. Turn off **Get fun facts, tips, tricks and more on your lock screen**.
4. Set **Lock screen status** to **None**. This keeps the bottom strip empty.
5. Turn on **Show the lock screen background picture on the sign-in screen**.
6. Lock the laptop with **Win + L**.

### Screensaver set, as a lock screen slideshow (recommended)
When Al locks the laptop, Windows shows the **lock screen, not the
screensaver**. The four frames therefore sit clear of the lock screen's clock
and bottom strip, so they work as a lock screen slideshow.

1. Go to Settings > Personalisation > Lock screen.
2. Set **Personalise your lock screen** to **Slideshow**, then **Add a folder** and pick `screensaver/2880x1800`.
3. Open **Advanced slideshow settings**:
   - Turn on **Only use pictures that fit my screen**.
   - Turn on **When my PC is inactive, show the lock screen instead of turning off the screen**.
   - Set **Turn off screen after slideshow has played for** to **Don't turn off**. Do this only at a stand on mains power.
4. To show the claim lock screen on its own again, switch back to **Picture** as described above.

### Screensaver set, as the Photos screensaver (alternative)
1. Go to Settings > Personalisation > Lock screen > **Screen saver**.
2. Pick **Photos**, then **Settings > Browse** and choose `screensaver/2880x1800`. Set the speed to Slow.
3. Turn on **On resume, display logon screen**.

This only runs while the laptop is unlocked and idle. Locking the laptop skips it.

### Keep the screen on at a stand
Go to Settings > System > Power & battery > Screen, sleep & hibernate timeouts.
While plugged in, set **Turn my screen off after** to **Never**. Set it back
after the event.

## Before an event: test on the machine
The safe areas assume **2880x1800 at 200 per cent** scaling, which is
Windows' default for this panel. Content confirms the following, with Al
present:

1. **Scaling.** Check Settings > System > Display > Scale. If it is not 200 per cent, re-run with `--effective-height`:
   - 175 per cent: 1029.
   - 225 per cent: 800. At this setting the producer refuses to build rather than let content overlap the clock.
2. **Lock screen layout.** Check that the clock and date (top centre), the widgets and the system icons (bottom) sit in empty space.
3. **Reading distance.** From two metres, at full and at half brightness, the main line must be readable.
4. **QR codes.** From one metre, every code must scan with an iPhone camera and with an Android camera app.
5. **What locking shows.** Lock the laptop, walk away, and confirm what actually appears.

## Rebuilding
Run these from `06_Brand_Assets/Design_Standards/producers/`:

```
node mo_event_screen.js check ../../Event_Screens/event_screen_kit.json --draft
node mo_event_screen.js build ../../Event_Screens/event_screen_kit.json --out ../../Event_Screens --draft
```

Once Content has replaced every `PLACEHOLDER` URL in `event_screen_kit.json`,
drop `--draft`. The build refuses a placeholder without the flag. A draft
frame carries a visible `DRAFT QR` stamp, so a placeholder code cannot be
mistaken for a final one.

**Keep each encoded URL to 84 bytes or fewer**, counting `https://` and the
UTM tags. Above that, the code needs more modules than the frame can hold at
a size a phone can scan from one metre, and the build fails. The free-chapter
page with full UTM tags is 117 bytes and does not fit, so use a short
redirect that adds the tags.
