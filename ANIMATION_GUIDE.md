# Animation System Guide

## Overview
Your portfolio now uses a **centralized animation configuration** system located in `src/config/animations.js`. This makes animations consistent, maintainable, and easy to customize across all pages and components.

---

## 📁 Structure

```
src/
├── config/
│   └── animations.js       ← Central animation configuration
├── pages/
│   ├── HomePage.jsx        ← Uses: pageVariants, childVariants
│   ├── ExperiencePage.jsx  ← Uses: pageVariants, sectionVariants, itemVariants
│   ├── PlutoPage.jsx       ← Uses: pageVariants, containerVariants, itemVariants
│   └── NotFoundPage.jsx    ← Uses: pageVariants, childVariants
└── components/
    ├── Hero.jsx            ← Uses: containerVariants, itemVariants
    ├── Contact.jsx         ← Uses: containerVariants, itemVariants
    ├── IntroAnimation.jsx  ← Uses: EASING
    └── MobileNav.jsx       ← Uses: EASING
```

---

## 🎨 Available Animation Variants

### 1. **pageVariants**
**Purpose:** Page-level route transitions  
**Best for:** Main page containers (HomePage, ExperiencePage, PlutoPage)

```javascript
import { pageVariants } from '../config/animations';

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
>
  {/* Page content */}
</motion.div>
```

**Animation:** Fades in, slides up slightly, with subtle scale effect

---

### 2. **containerVariants**
**Purpose:** Parent containers with staggered children  
**Best for:** Sections containing multiple animated items

```javascript
import { containerVariants } from '../config/animations';

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {/* Children with itemVariants */}
</motion.div>
```

**Animation:** Fades in, staggers children by 0.1s each

---

### 3. **sectionVariants**
**Purpose:** Main content areas with y-axis movement  
**Best for:** Major sections within a page

```javascript
import { sectionVariants } from '../config/animations';

<motion.section
  variants={sectionVariants}
  initial="hidden"
  animate="visible"
>
  {/* Section content */}
</motion.section>
```

**Animation:** Fades in with upward slide, staggers children

---

### 4. **itemVariants**
**Purpose:** Individual elements within containers  
**Best for:** Cards, list items, repeated elements

```javascript
import { itemVariants } from '../config/animations';

<motion.div variants={itemVariants}>
  {/* Item content */}
</motion.div>
```

**Animation:** Fades in with upward slide (works with parent stagger)

---

### 5. **childVariants**
**Purpose:** Subtle nested element animations  
**Best for:** Secondary content, nested elements

```javascript
import { childVariants } from '../config/animations';

<motion.div
  variants={childVariants}
  initial="initial"
  animate="animate"
>
  {/* Child content */}
</motion.div>
```

**Animation:** Light fade-in with minimal movement

---

### 6. **cardVariants**
**Purpose:** Interactive cards with hover effects  
**Best for:** Project cards, experience cards

```javascript
import { cardVariants } from '../config/animations';

<motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
  whileTap="tap"
>
  {/* Card content */}
</motion.div>
```

**Animation:** Includes hover lift and tap scale effects

---

### 7. **Directional Slide Variants**

#### slideInLeftVariants
```javascript
import { slideInLeftVariants } from '../config/animations';
```
**Animation:** Slides in from left side

#### slideInRightVariants
```javascript
import { slideInRightVariants } from '../config/animations';
```
**Animation:** Slides in from right side

---

### 8. **Simple Effects**

#### fadeInVariants
```javascript
import { fadeInVariants } from '../config/animations';
```
**Animation:** Simple opacity fade-in

#### scaleInVariants
```javascript
import { scaleInVariants } from '../config/animations';
```
**Animation:** Scales up from 0.8 to 1.0 with fade

---

## 🛠️ Utility Functions

### EASING Constant
```javascript
import { EASING } from '../config/animations';

// Use in custom animations
transition: {
  duration: 0.5,
  ease: EASING  // [0.25, 0.25, 0, 1] - cubic-bezier
}
```

### createStaggerContainer()
Create custom stagger containers with different timing:

```javascript
import { createStaggerContainer } from '../config/animations';

const myContainer = createStaggerContainer(0.15, 0.3);
// staggerDelay: 0.15s, delayChildren: 0.3s
```

### createCustomVariants()
Build custom animation variants:

```javascript
import { createCustomVariants } from '../config/animations';

const myVariants = createCustomVariants({
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  delay: 0.2,
  exit: { opacity: 0, x: 100 }
});
```

---

## 📝 Common Patterns

### Pattern 1: Page with Staggered Sections
```javascript
import { pageVariants, sectionVariants, itemVariants } from '../config/animations';

<motion.div variants={pageVariants} initial="initial" animate="animate">
  <motion.section variants={sectionVariants} initial="hidden" animate="visible">
    <motion.div variants={itemVariants}>Item 1</motion.div>
    <motion.div variants={itemVariants}>Item 2</motion.div>
  </motion.section>
</motion.div>
```

### Pattern 2: Container with Multiple Children
```javascript
import { containerVariants, itemVariants } from '../config/animations';

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Pattern 3: Interactive Cards
```javascript
import { cardVariants } from '../config/animations';

<motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
  whileTap="tap"
>
  Card content
</motion.div>
```

---

## 🎯 When to Use What

| Use Case | Recommended Variant |
|----------|-------------------|
| Page route transition | `pageVariants` |
| Section container | `containerVariants` or `sectionVariants` |
| List items | `itemVariants` (with parent container) |
| Project cards | `cardVariants` |
| Subtle nested content | `childVariants` |
| Coming from left | `slideInLeftVariants` |
| Coming from right | `slideInRightVariants` |
| Simple fade | `fadeInVariants` |
| Emphasis effect | `scaleInVariants` |

---

## 🔧 Customization

### Option 1: Override in Component
```javascript
import { pageVariants } from '../config/animations';

// Use base variant but override specific properties
<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  transition={{ duration: 1.0 }} // Custom duration
/>
```

### Option 2: Extend Existing Variant
```javascript
import { itemVariants } from '../config/animations';

const customItemVariants = {
  ...itemVariants,
  visible: {
    ...itemVariants.visible,
    rotate: 360 // Add rotation
  }
};
```

### Option 3: Use Helper Functions
```javascript
import { createCustomVariants } from '../config/animations';

const myVariants = createCustomVariants({
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  duration: 0.6
});
```

---

## ✅ Benefits of Centralized Animations

1. **Consistency:** All pages use the same smooth animations
2. **Maintainability:** Change once, applies everywhere
3. **Performance:** Shared animation configs are optimized
4. **Scalability:** Easy to add new variants
5. **DRY Principle:** No duplicate animation definitions
6. **TypeScript Ready:** Easy to add type definitions if needed

---

## 📚 Migration Summary

### Before (Embedded):
```javascript
// ❌ Defined in each file
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

### After (Centralized):
```javascript
// ✅ Import from central config
import { pageVariants } from '../config/animations';
```

---

## 🚀 Adding New Animations

1. Open `src/config/animations.js`
2. Add your new variant export:
```javascript
export const myNewVariants = {
  hidden: { /* ... */ },
  visible: { /* ... */ }
};
```
3. Import and use in any component:
```javascript
import { myNewVariants } from '../config/animations';
```

---

## 📖 Reference

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Animation Config:** `/src/config/animations.js`
- **Easing Reference:** https://easings.net/

---

**Last Updated:** October 11, 2025  
**Portfolio Version:** 2.0 (Centralized Animations)
