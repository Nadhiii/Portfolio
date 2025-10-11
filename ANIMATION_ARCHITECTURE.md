# Animation Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    src/config/animations.js                      │
│                   (SINGLE SOURCE OF TRUTH)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  📦 EXPORTS:                                                     │
│                                                                  │
│  • EASING              → Standard cubic-bezier curve            │
│  • pageVariants        → Page-level route transitions           │
│  • containerVariants   → Parent with staggered children         │
│  • sectionVariants     → Section-level animations               │
│  • itemVariants        → Individual items in lists              │
│  • childVariants       → Subtle nested elements                 │
│  • cardVariants        → Interactive cards (with hover)         │
│  • fadeInVariants      → Simple opacity transitions             │
│  • slideInLeftVariants → Slide from left                        │
│  • slideInRightVariants→ Slide from right                       │
│  • scaleInVariants     → Scale up with fade                     │
│  • createStaggerContainer() → Custom stagger helper             │
│  • createCustomVariants()   → Custom animation builder          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ imports
                              ▼
    ┌─────────────────────────────────────────────────────┐
    │                                                      │
    │                    CONSUMERS                         │
    │                                                      │
    └─────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │  PAGES  │          │ COMPS   │          │ HOOKS   │
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐               │
   │         │           │         │               │
   ▼         ▼           ▼         ▼               ▼
┌──────┐  ┌──────┐   ┌──────┐  ┌──────┐      (Future)
│ Home │  │ Exp  │   │ Hero │  │Contact│
├──────┤  ├──────┤   ├──────┤  ├──────┤
│ page │  │ Page │   │  .jsx│  │  .jsx│
│Vars  │  │Vars  │   │cont. │  │cont. │
│child │  │sect. │   │item  │  │item  │
│Vars  │  │item  │   └──────┘  └──────┘
└──────┘  └──────┘       │         │
                         ▼         ▼
┌──────┐  ┌──────┐   ┌──────┐  ┌──────┐
│ Pluto│  │ 404  │   │Mobile│  │Intro │
├──────┤  ├──────┤   ├──────┤  ├──────┤
│ Page │  │ Page │   │ Nav  │  │Anim  │
│page  │  │page  │   │EASING│  │EASING│
│cont. │  │child │   └──────┘  └──────┘
│item  │  └──────┘
└──────┘


┌─────────────────────────────────────────────────────────────────┐
│                      ANIMATION FLOW                              │
└─────────────────────────────────────────────────────────────────┘

Route Change
    │
    ▼
┌───────────────┐
│ pageVariants  │ ← Page-level entry animation
└───────┬───────┘   (opacity, y, scale)
        │           duration: 0.5s
        │           staggerChildren: 0.1s
        ▼
┌───────────────────┐
│containerVariants  │ ← Section container starts
└─────────┬─────────┘   delayChildren: 0.2s
          │             staggerChildren: 0.1s
          │
          ├─────────────────┐
          │                 │
          ▼                 ▼
    ┌──────────┐      ┌──────────┐
    │itemVars 1│      │itemVars 2│ ← Individual items animate
    └──────────┘      └──────────┘   with 0.1s delay between
          │                 │
          ▼                 ▼
    ┌──────────┐      ┌──────────┐
    │childVars │      │childVars │ ← Nested content (if any)
    └──────────┘      └──────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    TIMING DIAGRAM                                │
└─────────────────────────────────────────────────────────────────┘

Time →

0.0s  ████████████ pageVariants.initial
      │
0.2s  │ ████████████ containerVariants.hidden
      │ │
0.3s  │ │ ████ itemVariants[0].hidden
      │ │ │
0.4s  │ │ │ ████ itemVariants[1].hidden
      │ │ │ │
0.5s  │ │ │ │ ████ itemVariants[2].hidden
      ▼ ▼ ▼ ▼
      ████████████ pageVariants.animate (complete)
        ████████████ containerVariants.visible (complete)
          ████████ itemVariants[0].visible (complete)
            ████████ itemVariants[1].visible (complete)
              ████████ itemVariants[2].visible (complete)


┌─────────────────────────────────────────────────────────────────┐
│                 HOVER/INTERACTION FLOW                           │
└─────────────────────────────────────────────────────────────────┘

User Action          Animation
    │
    ├─ Hover Card  → cardVariants.hover
    │                 (y: -8, scale: 1.02)
    │
    ├─ Tap Card   → cardVariants.tap
    │                 (scale: 0.98)
    │
    ├─ Mobile Menu→ menuVariants.open
    │                 (opacity, scale, stagger)
    │
    └─ Theme Toggle→ Custom transitions


┌─────────────────────────────────────────────────────────────────┐
│                    IMPORT MAP                                    │
└─────────────────────────────────────────────────────────────────┘

Component               Imports
─────────────────────────────────────────────────────────────────
HomePage.jsx            pageVariants, childVariants
ExperiencePage.jsx      pageVariants, sectionVariants, itemVariants
PlutoPage.jsx           pageVariants, containerVariants, itemVariants
NotFoundPage.jsx        pageVariants, childVariants
Hero.jsx                containerVariants, itemVariants
Contact.jsx             containerVariants, itemVariants
IntroAnimation.jsx      EASING
MobileNav.jsx           EASING


┌─────────────────────────────────────────────────────────────────┐
│                  DEPENDENCY GRAPH                                │
└─────────────────────────────────────────────────────────────────┘

animations.js
    │
    ├─→ [EASING constant used by]
    │       ├─→ All variants internally
    │       ├─→ IntroAnimation.jsx
    │       └─→ MobileNav.jsx
    │
    ├─→ [pageVariants used by]
    │       ├─→ HomePage.jsx
    │       ├─→ ExperiencePage.jsx
    │       ├─→ PlutoPage.jsx
    │       └─→ NotFoundPage.jsx
    │
    ├─→ [containerVariants used by]
    │       ├─→ PlutoPage.jsx
    │       ├─→ Hero.jsx
    │       └─→ Contact.jsx
    │
    ├─→ [itemVariants used by]
    │       ├─→ ExperiencePage.jsx
    │       ├─→ PlutoPage.jsx
    │       ├─→ Hero.jsx
    │       └─→ Contact.jsx
    │
    ├─→ [sectionVariants used by]
    │       └─→ ExperiencePage.jsx
    │
    └─→ [childVariants used by]
            ├─→ HomePage.jsx
            └─→ NotFoundPage.jsx


┌─────────────────────────────────────────────────────────────────┐
│                   BUNDLE OPTIMIZATION                            │
└─────────────────────────────────────────────────────────────────┘

Source Code (animations.js)
    │
    │ [Vite Build Process]
    ▼
Tree Shaking
    │ (Removes unused exports)
    ▼
Minification
    │ (Compresses code)
    ▼
Code Splitting
    │ (Groups related animations)
    ▼
dist/assets/animations-Dcq6TVe5.js
    │
    ├─→ Size: 116.74 kB
    └─→ Gzip: 38.79 kB (67% reduction)


┌─────────────────────────────────────────────────────────────────┐
│                      FILE SIZES                                  │
└─────────────────────────────────────────────────────────────────┘

Before Centralization:
  HomePage.jsx:        ~300 lines (includes 40 lines of animations)
  ExperiencePage.jsx:  ~210 lines (includes 15 lines of animations)
  PlutoPage.jsx:       ~400 lines (includes 45 lines of animations)
  NotFoundPage.jsx:    ~127 lines (includes 35 lines of animations)
  Hero.jsx:            ~261 lines (includes 25 lines of animations)
  Contact.jsx:         ~422 lines (includes 25 lines of animations)
  ───────────────────────────────────────────────────────────────
  TOTAL ANIMATION CODE: ~185 lines (duplicated across files)

After Centralization:
  animations.js:       230 lines (all reusable)
  All components:      Reduced by 185 lines total
  ───────────────────────────────────────────────────────────────
  NET SAVINGS:         Clean, maintainable, single source


┌─────────────────────────────────────────────────────────────────┐
│                    MAINTENANCE FLOW                              │
└─────────────────────────────────────────────────────────────────┘

Want to Change Animation Speed?
    │
    └─→ Edit: animations.js
        └─→ Affects: ALL pages/components automatically ✅

Want to Add New Animation?
    │
    ├─→ 1. Add export to animations.js
    ├─→ 2. Import in component
    └─→ 3. Use with motion.div ✅

Want Custom Animation for One Component?
    │
    ├─→ Option A: Use createCustomVariants()
    ├─→ Option B: Extend existing variant
    └─→ Option C: Define locally (if truly unique) ✅


Legend:
  ████ = Animation in progress
  │    = Timeline flow
  →    = Data flow
  ▼    = Continues to
  ✅   = Success/Recommended
```
