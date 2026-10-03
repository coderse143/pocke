# Pocké

A small expense tracker you can install on your phone. Add daily expenses, see monthly and yearly totals. It works offline once installed, and your data stays on your phone.

## Put it online (free, about 2 minutes)

The app has to live at a web address (https) before a phone can install it. Pick one:

**Netlify Drop (easiest)**
1. Unzip this folder.
2. Go to https://app.netlify.com/drop and sign in.
3. Drag the unzipped `pocke` folder onto the page.
4. Netlify gives you an address like `https://something.netlify.app`.

**Cloudflare Pages or GitHub Pages** also work. Upload these files as they are, with `index.html` at the top level.

## Install on your phone

Open your address in the phone's browser.

- **Android (Chrome):** menu (three dots), then **Install app** or **Add to Home screen**.
- **iPhone (Safari):** Share button, then **Add to Home Screen**.

Open it once while online so it can save itself for offline use.

## Good to know

- Expenses are saved on the phone you add them on. They are not shared between devices.
- Clearing the browser's site data deletes them. Use **Download backup (CSV)** at the bottom of the app now and then.
- This is a separate copy from the one inside Claude, so entries made there do not carry over.
- To update the app later, upload the new files to the same place and change `VERSION` at the top of `sw.js`.
