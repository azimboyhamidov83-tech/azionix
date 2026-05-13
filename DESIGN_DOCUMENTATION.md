# LOVEGRAM Find Page - Design Documentation

## Overview

This document describes the pixel-perfect recreation of the LOVEGRAM "Find/Search" page design. The design follows a premium, modern aesthetic inspired by dating and social media apps, with a focus on dark mode, neon pink accents, and smooth interactions.

---

## Design System

### Color Palette

| Name | Hex Code | Usage |
|------|----------|-------|
| **Primary Pink** | `#ec4899` | Active states, accents, hover effects |
| **Primary Dark** | `#be185d` | Darker variant of primary |
| **Primary Light** | `#f472b6` | Text hover, links |
| **Primary Accent** | `#fce7f3` | Lightest pink variant |
| **Black** | `#000000` | Main background |
| **Slate 900** | `#0f172a` | Surface backgrounds |
| **Slate 950** | `#020617` | Darker surfaces |
| **White** | `#ffffff` | Primary text |
| **Gray 300** | `#d1d5db` | Secondary text |
| **Gray 500** | `#6b7280` | Tertiary text (icons, placeholders) |
| **Slate 700** | `#475569` | Dividers, subtle borders |
| **Slate 800** | `#1e293b` | Borders, hover backgrounds |

### Typography

- **Font Family**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'` (System fonts)
- **Sizes**:
  - Logo: `1.25rem` (20px) bold
  - Page Title: `2.25rem` (36px) bold
  - User Handle: `1rem` (16px) medium
  - Menu Item: `0.875rem` (14px) medium
  - Small Text: `0.75rem` (12px)

### Spacing

- Sidebar padding: `1.5rem` (24px)
- Content padding: `1.5rem` to `2rem`
- Item spacing: `1rem` (16px)
- Gap between icon & text: `1rem`
- List item padding: `1rem`

### Border Radius

- Sidebar menu items: `0.5rem` (8px)
- Avatar images: `9999px` (circular)
- Search input: `9999px` (pill shape)
- Buttons: `0.5rem` to `9999px`

### Shadows & Glows

```css
/* Subtle shadow for depth */
box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);

/* Active states glow */
box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);

/* Focus state on search */
box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);
```

### Gradients

**Sidebar Background:**
```css
background: linear-gradient(180deg, #000000 0%, #0f172a 50%, #020617 100%);
```

**Main Content Background:**
```css
background: linear-gradient(135deg, #0f172a 0%, #000000 50%, #0f172a 100%);
```

**Active Menu Item:**
```css
background: linear-gradient(90deg, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.1) 100%);
```

**Search Bar Bottom:**
```css
background: linear-gradient(180deg, transparent 0%, #000000 50%, #000000 100%);
```

---

## Layout Structure

### Viewport Breakdown

1. **Sidebar** (240px fixed)
   - Width: `14rem` (224px) on desktop, hidden on mobile
   - Contains: Logo, navigation, profile section
   - Background: Dark gradient

2. **Main Content** (Flexible)
   - Header section with page title
   - Scrollable user list
   - Fixed search bar at bottom

3. **Search Bar** (Fixed)
   - Position: Bottom of viewport
   - Height: `3rem` (48px) with padding
   - Spans: Full width minus sidebar (or full width on mobile)

---

## Components

### 1. Sidebar

**Structure:**
```
┌─────────────────────┐
│  Logo (LOVEGRAM)    │
├─────────────────────┤
│  Menu Items         │
│  - Menu             │
│  - Chat             │
│  - Find (ACTIVE)    │
│  - Profile          │
├─────────────────────┤
│  Profile Section    │
│  Avatar + Handle    │
└─────────────────────┘
```

**Styling:**
- Active menu item has pink gradient background + glow shadow
- Hover states: slightly darker background, text color change
- Icons: 20px, stroked
- Text: Gray by default, white on hover, pink on active

### 2. User List Item

**Structure:**
```
┌─────────────────────────────────────┐
│  [Avatar]  @username            >   │
└─────────────────────────────────────┘
```

**Details:**
- Avatar: `3.5rem` (56px) circular with `2px` pink border
- Username: White text, `1rem` size
- Arrow: `1.25rem`, gray by default
- Hover effect: Darker background, border becomes solid pink, arrow turns pink
- Divider: Subtle gradient line between items

### 3. Search Bar

**Structure:**
```
┌───────────────────────────────────────┐
│ 🔍  Qidirish uchun...                 │
└───────────────────────────────────────┘
```

**Details:**
- Background: `rgba(15, 23, 42, 0.8)` with backdrop blur
- Border: `1px solid rgba(71, 85, 105, 0.5)`
- Border radius: `9999px` (pill shape)
- Padding: `0.75rem` vertical, `1rem` horizontal (left `3rem` for icon)
- Focus state: Pink border, enhanced glow, darker background

### 4. Logo

**LOVEGRAM**
- "LOVE" in white
- "GRAM" in pink (`#ec4899`)
- Heart icon in pink
- Tracking: `0.05em` letter-spacing

---

## Responsive Behavior

### Desktop (≥ 768px)
- Sidebar visible (14rem width)
- Full layout displayed
- Search bar spans from sidebar edge

### Mobile (< 768px)
- Sidebar hidden (use hamburger menu or drawer)
- Main content full width
- Search bar spans full width
- Adjusted font sizes and spacing

---

## Interactions & Animations

### Hover Effects

**List Items:**
```css
transition: all 300ms ease;
/* On hover: */
- Background becomes darker
- Avatar border becomes solid pink
- Arrow icon turns pink and translates right
- Username text turns pink
```

**Menu Items:**
```css
transition: all 300ms ease;
/* On hover (inactive): */
- Background color slightly darker
- Text becomes white

/* Active item: */
- Gradient pink background
- Pink text
- Glow shadow effect
```

**Search Input:**
```css
transition: all 300ms ease;
/* On focus: */
- Border color becomes pink
- Box shadow glows pink
- Background becomes more opaque
```

### Transitions
- Standard duration: `300ms`
- Easing: `ease` or `ease-in-out`
- Properties: `all` or specific (`color`, `background`, `box-shadow`, `transform`)

---

## Files Included

1. **FindPage.tsx** - React component with Tailwind CSS
2. **FindPage.html** - Standalone HTML + CSS version
3. **design-system.css** - CSS variables and utilities
4. **app/find/page.tsx** - Next.js page implementation
5. **DESIGN_DOCUMENTATION.md** - This file

---

## Usage

### React/Next.js Implementation

```tsx
import FindPage from '@/components/FindPage';

export default function Page() {
  return <FindPage />;
}
```

Or use the updated `app/find/page.tsx` which integrates with your existing data structure.

### Standalone HTML

Simply open `FindPage.html` in a browser. All styling is inline in the HTML file.

---

## Design Decisions

### Why This Design?

1. **Dark Mode**: Reduces eye strain, modern aesthetic, aligns with premium apps
2. **Pink Accents**: High contrast with dark background, draws attention, aligns with "LOVEGRAM" branding
3. **Gradients**: Adds depth and visual interest without being overwhelming
4. **Rounded Pill Shapes**: Friendly, modern, commonly used in dating/social apps
5. **Glowing Effects**: Premium feel, indicates interactive elements
6. **Subtle Dividers**: Separates items without being visually heavy
7. **Fixed Search**: Always accessible, follows mobile app patterns
8. **Minimalist Icons**: Clean, professional appearance

---

## Accessibility Considerations

1. **Color Contrast**: All text meets WCAG AA standards
2. **Focus States**: Keyboard navigation has visible focus indicators
3. **Icon Labels**: Icons have accompanying text labels
4. **Hit Targets**: All clickable elements are ≥ 44px in size
5. **Semantic HTML**: Proper heading hierarchy and button elements

---

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Mobile: ✅ Responsive and tested on iOS/Android

---

## Future Enhancements

1. **Advanced Filters**: Filter by location, interests, etc.
2. **Sort Options**: Sort by newest, most popular, etc.
3. **Favorites**: Star/heart users for quick access
4. **View Modes**: Grid vs. list view toggle
5. **Dark/Light Theme Toggle**: Allow users to switch themes
6. **Pagination**: Load more users as you scroll

---

## Notes

- All colors use CSS variables for easy maintenance
- Spacing follows a consistent 8px/16px grid
- Typography uses system fonts for optimal performance
- Images use `object-fit: cover` to maintain aspect ratio
- Transitions are optimized for 60fps performance
- Design is fully responsive without media query hacks

---

## Contact & Support

For questions or modifications to the design, refer to the component files or the design system CSS variables.
