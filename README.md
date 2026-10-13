# River redesign (work in progress)

The new mahanadhi.space, built alongside the current site so nothing live changes.

Run it:

    cd redesign-river
    npm install
    npm run dev

Then open the address Vite prints (usually http://localhost:5173).

What works in this first build:
- Teal intro that cycles your name through five scripts, then lifts away (once per tab; "Skip intro" button).
- Home screen with the bench scene.
- Desktop, landscape: one screen per stop, scroll wheel or arrow keys move sideways, river bar at the bottom.
- Phones and portrait screens: stops stack vertically, menu button in the top bar.
- All eight stops are built from the canvas design. Desktop stops are designed at 1440 x 756 and scale to fit any landscape window.
