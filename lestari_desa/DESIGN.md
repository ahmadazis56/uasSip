---
name: Lestari Desa
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3f4944'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#6f7973'
  outline-variant: '#bec9c2'
  surface-tint: '#1b6b51'
  primary: '#004532'
  on-primary: '#ffffff'
  primary-container: '#065f46'
  on-primary-container: '#8bd6b7'
  inverse-primary: '#8bd6b6'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#333f39'
  on-tertiary: '#ffffff'
  tertiary-container: '#4a564f'
  on-tertiary-container: '#becac2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f2d1'
  primary-fixed-dim: '#8bd6b6'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513b'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#d9e6dd'
  tertiary-fixed-dim: '#bdcac1'
  on-tertiary-fixed: '#131e19'
  on-tertiary-fixed-variant: '#3e4943'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.5'
  body-main:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is crafted to represent the lush, natural beauty of Desa Selelos while maintaining a professional digital interface for modern travelers. The personality is **welcoming, crystalline, and dependable**. It aims to evoke a sense of tranquility and adventure, balancing the "wild" nature of forest tourism with the "ordered" clarity of a high-end information portal.

The visual style is a hybrid of **Minimalism** and **Modern Corporate**, utilizing heavy whitespace to let high-quality photography of waterfalls and greenery breathe. We employ a "Tropical Clean" aesthetic: wide margins, high-legibility type, and a focus on clarity to ensure that information regarding local attractions, amenities, and logistics is easily digestible for both domestic and international tourists.

## Colors

The palette is derived directly from the Selelos landscape.

- **Primary (Hutan):** A deep, emerald green (`#065F46`) used for primary actions, branding elements, and navigation headers. It represents the dense forest canopy.
- **Secondary (Tirta):** A vibrant sky/water blue (`#0EA5E9`) used for links, secondary call-to-actions, and highlights, echoing the village's waterfalls.
- **Surface (Alam):** A very soft mint-white (`#F0FDF4`) used as a background alternative to pure white to reduce eye strain and reinforce the tropical theme.
- **Text (Batuan):** A dark slate (`#1E293B`) for high-contrast typography, ensuring maximum readability (Keterbacaan).

Status colors should follow standard conventions: Success (Emerald), Warning (Amber), and Error (Rose), but desaturated slightly to fit the natural palette.

## Typography

This design system utilizes **Plus Jakarta Sans** across all levels. Its soft curves and modern geometry provide a welcoming atmosphere while remaining highly functional for a "Sistem Informasi."

- **Hierarki (Hierarchy):** Use `display-lg` for hero sections welcoming visitors to the village. Use `headline-md` for section titles like "Destinasi Populer."
- **Keterbacaan (Readability):** Body text must always maintain a line height of at least 1.6 to ensure long-form descriptions of travel spots are comfortable to read.
- **Labels:** Use uppercase for `label-bold` in navigation or small buttons to provide a clean, architectural feel.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1280px to prevent excessive line lengths on ultra-wide monitors.

- **Grid System:** A 12-column grid for desktop, 6-column for tablet, and 2-column for mobile.
- **Spacing Rhythm:** Based on an 8px baseline. Use 16px (2u) for internal component padding and 24px (3u) or 32px (4u) for vertical gaps between sections.
- **Responsive Behavior:** On mobile devices, side margins should shrink to 16px, and grid items should stack vertically. Images should maintain a 16:9 or 4:3 aspect ratio to preserve the visual impact of the landscape photography.

## Elevation & Depth

This design system uses **Ambient Shadows** to create a sense of organized layers without looking cluttered.

- **Level 1 (Surface):** Default background.
- **Level 2 (Cards):** Use a soft, diffused shadow (`0px 4px 20px rgba(6, 95, 70, 0.08)`) with a slight green tint in the shadow to harmonize with the primary color.
- **Level 3 (Modals/Overlays):** Stronger elevation with a 15% opacity backdrop blur (Glassmorphism) behind the element to maintain context of the tropical background while focusing user attention.
- **Outlines:** Use 1px borders in `#E2E8F0` for form inputs to keep the UI grounded and professional.

## Shapes

The shape language is **Rounded**, reflecting the organic curves found in nature—river stones, leaves, and hills.

- **Standard Radius:** 0.5rem (8px) for cards and input fields.
- **Large Radius:** 1rem (16px) for major containers and image carousels.
- **Interactive Elements:** Buttons should use a 0.5rem radius or be fully rounded (pill-shaped) for a more friendly, approachable "Action" feel. Avoid sharp corners entirely to maintain the soft, professional aesthetic.

## Components

### Buttons (Tombol)
- **Primary:** Solid `#065F46` with white text. Bold weight. High-contrast for "Pesan Sekarang" or "Lihat Detail."
- **Secondary:** Outlined with `#065F46` or solid `#0EA5E9` for secondary actions like "Unduh Peta."

### Cards (Kartu Destinasi)
- Cards must feature a top-aligned image with a fixed aspect ratio.
- Use a 1px soft border combined with the Level 2 shadow.
- Padding should be 20px internally. Content includes: Title, Rating/Badge, and a short snippet.

### Input Fields (Formulir)
- Backgrounds should be pure white.
- Focus state: 2px border using the secondary blue (`#0EA5E9`) with a soft glow.
- Labels sit above the field in `label-bold` style.

### Chips (Lencana)
- Used for categories like "Air Terjun," "Hutan," or "Edukasi."
- Use light tints of the primary or secondary colors with dark text for high accessibility.

### Navigation (Navigasi)
- Transparent background on scroll-start (if over a hero image), transitioning to a solid white background with a subtle bottom border upon scrolling.