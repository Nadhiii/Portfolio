# mahanadhi.space

Mahanadhi Parisara's portfolio: a horizontal "river" of nine stops (home, work, Nandini POS, Nexus,
team tools, experience, skills, about, contact). Vite 7 + React 19, plain CSS, no router.

Run it:

    npm install
    npm run dev

Then open the address Vite prints (usually http://localhost:5173).

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

How it works:
- Teal intro that cycles the name through five scripts, then lifts away (once per tab; "Skip intro" button).
- Desktop, landscape: one screen per stop, scroll wheel or arrow keys move sideways, river bar at the bottom.
  Each stop is designed at 1440 x 756 and scales to fit the window.
- Phones and portrait screens: stops stack vertically, menu button in the top bar.
- Each stop has a hash (`#work`, `#nexus`, ...). Old paths such as `/projects` are mapped to a stop on load
  (`src/legacyRoutes.js`).
- GTM container GTM-597PL9J4 loads from `index.html`; events are pushed from `src/utils/analytics.js`.
- The contact form sends through EmailJS. Its public settings live in `src/config/emailjs.js`, so nothing has to
  be set on the host. "Book a call" opens the Google Calendar booking page in a pop-up.

Hosting: Netlify builds `main` from GitHub and serves `dist/` at mahanadhi.space. All changes go through GitHub. `public/_redirects` sends unknown paths to `index.html`.

`public/update.json` is fetched by the Nexus Android app at https://mahanadhi.space/update.json to check for
updates. Never delete or rename it.
