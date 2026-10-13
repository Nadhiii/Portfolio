# Handoff: take the "river" redesign live on mahanadhi.space

You are Claude Code, working on Nadhi's machine in the repo `E:\Github\Portfolio`.
The new site lives in `redesign-river/`. The design is approved and the code runs. Your job is to
make it the real site, wire up the parts that are still mock, and ship it through Vercel.

Read this whole file before touching anything. Work through the phases in order, and stop at the end
of each phase to show Nadhi what changed.

---

## 0. Ground rules (do not break these)

1. **No em dashes anywhere.** Not in copy, comments, commit messages or anything else. Use a comma,
   colon, semicolon or hyphen instead.
2. **Don't redesign.** Layout, colours, fonts and copy are signed off. If something looks broken,
   fix the bug; don't restyle it. Ask before changing any visible copy.
3. **Keep private things private.** Never add colleague names, work emails, sheet IDs or internal
   URLs, and never name the employer or client in the vision card. Don't mention money details like
   loans or balances, or health details. The Team tools stop uses invented agents (Asha, Ben, Carla)
   and placeholder config ("Your name", "your-sheet-id"); keep it that way.
4. **`public/update.json` must keep working.** The Nexus Android app fetches
   `https://mahanadhi.space/update.json` to check for updates. It must still be served at that exact
   URL after the switch. Never delete or rename it.
5. **AI credit stays.** The site openly says it was built with Claude (mostly) and Gemini
   (sometimes). Don't remove that.
6. Work on a branch. Don't push to `main` until Nadhi has checked the Vercel preview.
7. The root `AGENTS.md` mentions graphify. It describes the OLD site. Ignore it for this task; it will
   be stale after the switch, and you can run `graphify update .` at the very end if it is installed.

---

## 1. What the new site is (quick map)

A Vite 7 + React 19 single page app, plain CSS, no Tailwind and no router.

- **Desktop (landscape, width 1024px and up):** a horizontal "river". There are 9 stops, each one full
  screen. You move between them with the wheel, arrow keys, the top bar or the river bar along the
  bottom. Each stop is designed at 1440x756 and scaled to fit the window (`useStageScale` in
  `River.jsx`).
- **Phone or portrait:** the same panels stacked vertically. Attribute-selector overrides in
  `styles.css` (the `.river--stacked` rules) reflow them.
- **URL:** one hash per stop (`#work`, `#nexus`, ...), set with `history.replaceState`.
- **Intro:** the name cycles through Kannada, Malayalam, Tamil, Telugu, Hindi, then English on a
  teal curtain. It plays once per browser session (`sessionStorage.introSeen`), can be skipped, and
  respects reduced motion.

```
redesign-river/
  index.html              fonts + meta (GTM and OG go here, see phases 3 and 5)
  package.json            react, react-dom, vite, @vitejs/plugin-react
  vite.config.js
  public/img/             screenshots + claude-code.png (bench character)
  src/
    main.jsx, App.jsx     App = Intro + River
    stops.js              STOPS order: home, work, nandini, nexus, team, experience, skills, about, contact
    css.js                css("a:b;c:d") -> style object helper
    styles.css            tokens, top bar, river bar, stage scaling, intro, bench, stacked overrides
    components/
      Intro.jsx           name cycle curtain
      TopBar.jsx          logo, Work/Experience/Skills/About, "Let's talk"
      RiverBar.jsx        wavy progress bar with the 9 stops
      River.jsx           scroller, wheel/keys, hash, stage scale
      BenchScene.jsx      pixel Nadhi + Claude Code on a bench, cold coffee, 5-line chat
    panels/
      HomePanel, WorkPanel, NandiniPanel, NexusPanel, TeamPanel,
      ExperiencePanel, SkillsPanel, AboutPanel, ContactPanel
```

Colour tokens (already in `styles.css`): ground `#F4F3EF`, ink `#111111`, body `#33322F`,
muted `#5C5B57`, line `#CFCDC6`, accent `#B4430F`, river teal `#0E5A5E`, riverSoft `#B9D3D1`,
night `#0A0A0A`, orange on dark `#E8732A`, gold `#C9A84C`.

The design reference (approved mockups) is in the downloaded zip under `design/`, and also on the
canvas: https://claude.ai/artifact/Q37R9itWULtyUwXb4RLSki

---

## Phase 1: Clean up and run it

1. `git checkout -b redesign-river`
2. Delete these leftover files in `redesign-river/`. They are unused, so check with grep first:
   - `src/panels/Home.jsx`
   - `src/panels/Placeholder.jsx`
   - `public/claude-code.png` (the real one is `public/img/claude-code.png`)
3. `cd redesign-river && npm install && npm run dev`, then click through all 9 stops. Then run
   `npm run build && npm run preview` and confirm there are no console errors.

**Done when:** the dev and build commands both run clean.

---

## Phase 2: Make the redesign the root app

The old site (Tailwind, react-router, three.js and so on) is replaced, but **not deleted from
history**. Git keeps it.

1. Before you delete anything, copy these from the OLD root into the new app's `public/`:
   - `public/update.json` (**critical**, see rule 4)
   - `public/robots.txt`
   - `public/sitemap.xml` (you'll rewrite it in phase 5)
2. Move the new app to the repo root:
   - Replace the root `index.html`, `package.json`, `vite.config.js`, `src/` and `public/` with the
     ones from `redesign-river/`, keeping the files you copied in step 1.
   - Delete `tailwind.config.js` and `postcss.config.js`. The new app has no Tailwind, and a
     PostCSS config that points at Tailwind will break the build.
   - Delete the three stray tarballs at the root: `lucide-react-1.24.0.tgz`,
     `prism-react-renderer-2.4.1.tgz` and `prismjs-1.26.6.tgz`. Ask Nadhi first.
   - Keep `vercel.json`, `.gitignore`, `.env` and `.env.example`, `LICENSE` and `favicon.svg`
     (you'll replace it in phase 5).
   - `eslint.config.js`: keep it, and add `eslint`, `@eslint/js`, `globals`,
     `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` back to devDependencies, plus a
     `"lint": "eslint ."` script.
   - Add `@emailjs/browser` (`^4.4.1`) to dependencies, for phase 4.
   - Then delete the now-empty `redesign-river/` folder.
3. `npm install`, `npm run build`, and confirm that `dist/update.json` exists and matches the old
   one.
4. **Old URLs must still land somewhere.** The old site had real routes (see the old sitemap):
   `/projects`, `/skills`, `/experience`, `/contact`, plus `/about`, `/nexus` and `/pluto`. On load,
   if `location.pathname !== '/'`, map the path to a stop hash and
   `history.replaceState(null, '', '/#<stop>')` before River reads the hash:

   | Old path | New stop |
   |---|---|
   | `/projects` | `#work` |
   | `/nexus`, `/pluto` | `#nexus` |
   | `/skills` | `#skills` |
   | `/experience` | `#experience` |
   | `/about` | `#about` |
   | `/contact` | `#contact` |
   | anything else | `#home` |

   Do this in `App.jsx` (or a tiny helper) so it runs before River mounts. `vercel.json` already
   rewrites every path to `index.html`; keep that rewrite, and keep `"handle": "filesystem"` first so
   `/update.json` is still served as a file.

**Done when:** `/update.json` returns JSON in preview, and `/projects` lands on the Work stop.

---

## Phase 3: Google Tag Manager and analytics

Nadhi is a measurement specialist, so this part matters more than usual.

1. In `<head>`, as high as possible, add the GTM container **GTM-THQZH8J7**. Copy the exact snippet
   from the old `index.html`, including the `<noscript>` iframe right after `<body>`. You can read
   the ID from `VITE_GTM_ID`, but hardcoding it in `index.html` is what the old site did and is fine.
2. Bring over `src/utils/analytics.js` from the old site (it's in git history). Keep `trackEvent`,
   `trackPageView` and `trackFormSubmissionWithEnhancedConversion` exactly as they were. Delete the
   `console.log` lines that contain emoji, or keep them DEV-only as they are now.
3. Fire these events, and **keep the old event names**, because the live GTM container already has
   triggers for them:

   | Where | Event |
   |---|---|
   | Each time the current stop changes in `River.jsx` (also on first load) | `trackPageView(stop.label, stop.id)` pushes `page_view` with `page_title` and `page_section` |
   | TopBar links | `nav_click` (label = link label) |
   | Logo | `logo_click` |
   | Mobile menu open | `mobile_menu_open` |
   | River bar dots | `nav_click` with label `riverbar:<id>` |
   | "Read the case study" cards on Work | `case_study_open` (label = stop id) |
   | Résumé buttons (Home, Experience) | `resume_click` |
   | LinkedIn and email links on Contact | `linkedin_click` and `email_click` (the old site built these from the link label) |
   | Intro "Skip intro" | `intro_skip` |
   | Team tools tabs and dispatch demo pick | `team_tab` (label = tab) and `dispatch_demo_pick` |
   | Contact form | see phase 4 |

4. Don't double-fire. The wheel handler can move several stops quickly, so only fire `page_view`
   once the stop has settled (when the IntersectionObserver sets the index).

**Done when:** in GTM Preview (Tag Assistant), moving through the river shows one `page_view` per
stop and the click events show up. Ask Nadhi to run the GTM preview himself; he knows the container.

---

## Phase 4: Make the Contact form real (EmailJS + Enhanced Conversions)

Right now `ContactPanel.jsx` is a front-end mock: `onSubmit` just calls `preventDefault`, and `sent`
is never set to true by a real send.

1. Make the inputs controlled (`name`, `email`, `message`). Keep the topic chips as they are; the
   selected topic label is `TOPICS[topic][0]`.
2. On submit:
   - Validate that the name, email and message are all filled in, the email looks like an email,
     and the message is at least 10 characters. Show inline errors in the existing style (accent
     colour, 14px). Don't use `alert()`.
   - Set status to `sending` and disable the button. The button text becomes "Sending…".
   - Call `emailjs.send(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, params, VITE_EMAILJS_PUBLIC_KEY)`
     with **the same params the old template expects**:
     ```js
     { from_name, from_email, phone: '', subject: TOPICS[topic][0], message, to_name: 'Mahanadhi' }
     ```
   - On success, show the existing "sent" state (`setSent(true)`), then:
     - Call `trackFormSubmissionWithEnhancedConversion({ email, phone: '', name, firstName, lastName })`.
       This pushes `form_success`.
     - Push `generate_lead` with `form_type` (the topic) and `user_data`
       (`email_address`, `address.first_name`, `address.last_name`). This is the same shape the old
       `Contact.jsx` used; copy it from git history. Leave `phone_number` out when it's empty;
       don't push an empty string.
   - On error, show "Couldn't send that. Try again, or email me directly." with the mailto link,
     and push `contact_form_error` like the old site did.
3. The env vars are already in Nadhi's `.env` (see `.env.example`). Don't print them or commit them.
   On Vercel, check that the three `VITE_EMAILJS_*` variables exist for Production and Preview.
4. Supabase (`VITE_SUPABASE_*`) is not used by the new site. Leave it out.

**Done when:** a real test message arrives in Nadhi's inbox, and Tag Assistant shows `form_success`
and `generate_lead` carrying user data.

---

## Phase 5: Meta, sharing, favicon, sitemap

1. `index.html` `<head>`. The title and description already exist; add:
   - `<link rel="canonical" href="https://mahanadhi.space/">`
   - `<meta name="theme-color" content="#F4F3EF">`
   - Open Graph tags: `og:type` website, `og:url`, `og:title` = the page title, `og:description`
     = the meta description, `og:image` = `https://mahanadhi.space/og.png` with
     `og:image:width` 1200 and `og:image:height` 630, and `og:image:alt`.
   - Twitter: `twitter:card` = `summary_large_image`, plus the same title, description and image.
   - A JSON-LD `Person` block with `name` "Mahanadhi Parisara", `jobTitle` "MarTech & Analytics
     Specialist", `url`, and `sameAs` set to the LinkedIn URL from the Contact panel. Don't add the
     employer.
2. **OG image** (`public/og.png`, 1200x630): make it from the Home stop. Run the preview, take a
   1200x630 screenshot of `/#home` with the intro skipped (set `sessionStorage.introSeen = '1'`
   first), and save it. Keep it under 300 KB.
3. **Favicon:** replace `favicon.svg` with the "MP" mark used in the top bar: an ink `#111111`
   rounded square (rx about 22% of the size) with "MP" in `#F4F3EF`, bold, centred. Link it with
   `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`. Also add a 180x180
   `apple-touch-icon.png` in the same design.
4. **Sitemap:** the old one lists routes that no longer exist. Rewrite `public/sitemap.xml` with
   just `https://mahanadhi.space/`, with `lastmod` set to today. Hash URLs don't belong in a
   sitemap. Keep `robots.txt` as it is.
5. Optional: add `<noscript>` text in `<body>` saying the site needs JavaScript, with a mailto
   link.

**Done when:** a share-preview check (for example, pasting the preview URL into LinkedIn Post
Inspector after deploy) shows the image, title and description.

---

## Phase 6: Quality pass

Check each of these. Fix anything broken without restyling.

1. **Viewports:** 1440x900, 1920x1080, 1366x768, 1280x800, an iPad in landscape (1180x820) and in
   portrait, and phones at 390x844 and 360x780. Every stop must fit with nothing clipped. If a stop
   clips at 1366x768, the stage scale should handle it, so look for a fixed height inside the panel.
2. **Keyboard:** Tab reaches every link and button with a visible focus ring. The arrow keys move
   between stops, but must not do so while focus is inside the contact form's inputs or textarea.
   Check this, and guard it in `River.jsx` if needed.
3. **Reduced motion:** with OS reduced motion on, the intro shows the English name without cycling,
   the bench chat shows its last line, and nothing bobs.
4. **Lighthouse** on the production build (mobile and desktop): aim for 90+ on Performance,
   Accessibility, Best Practices and SEO. The usual fixes: give the screenshots in `public/img/`
   `width`/`height` and `loading="lazy"`; convert the PNGs to WebP if they are over 200 KB, keeping
   the PNG fallback unless it's not needed; and add `font-display: swap`, which Google Fonts already
   does.
5. **Alt text:** every `<img>` has meaningful alt text. The bench SVG has `role="img"` and a label.
6. `npm run lint` must be clean.

---

## Phase 7: Deploy

1. Commit in logical chunks (cleanup, root swap, GTM, contact, meta, QA fixes). Use plain commit
   messages with no em dashes.
2. Push the `redesign-river` branch. Vercel builds a **preview URL**. Send it to Nadhi.
3. Check on the preview:
   - `/update.json` works
   - `/projects` takes you to Work
   - the form sends
   - GTM fires (Tag Assistant can connect to the preview URL)
   - the share image loads
4. Only after Nadhi says yes: merge to `main`. Vercel deploys production to mahanadhi.space.
5. After it's live:
   - Re-check `https://mahanadhi.space/update.json` from a phone. The Nexus app depends on it.
   - Submit the sitemap in Search Console if Nadhi uses it.
   - Run `graphify update .` if graphify is installed, and update `AGENTS.md` so it describes the
     new site rather than the old one.

---

## Things only Nadhi can do (remind him; don't do them yourself)

1. **POS screenshots:** real staff names are visible in a couple of the Nandini POS screenshots
   (`public/img/pos-*.png`). Retake them with demo names, or blur those names, before launch.
2. **Claude Code character:** `public/img/claude-code.png` is the character Nadhi supplied. Check
   Anthropic's brand guidelines on using it on a personal site.
3. **Résumé link:** `https://rxresu.me/nadhiii/general` is used on Home and Experience. Confirm it's
   the current version.
4. **Email:** the footer and contact use `mahanadhip@gmail.com`. Confirm that's the address he wants
   public.
5. **EmailJS template:** confirm the template still uses `from_name`, `from_email`, `phone`,
   `subject`, `message` and `to_name`.

---

## Not part of this task (FYI only)

Fixes noticed in Nadhi's Apps Scripts, which live outside this repo:

- **Follow-ups script:** in `hideYesterday`, the `lastWorkday` line is never used and has an
  operator-precedence slip. It's safe to delete.
- **Dispatch center:** `Code.gs` and `WebApp.gs` both define `columnToLetter`,
  `getMasterDBHeaders` and `isEligibleForGeneralPool`. Apps Script shares one global scope, so the
  last file loaded wins. Keep one copy of each.
- **Dispatch center:** notes are put into the email HTML unescaped. Escape `& < > " '` before
  building the body.
