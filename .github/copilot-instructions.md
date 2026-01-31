# Al-Safwa Travel - AI Agent Instructions

## Project Overview
Static landing page for an Umroh (Islamic pilgrimage) travel agency. Built with vanilla HTML/CSS/JS without frameworks or build tools. Indonesian language content targeting Indonesian Muslim travelers.

## Architecture

### Single-Page Application Structure
- **index.html**: Main entry point with semantic sections (hero, packages, features, gallery, testimonials, register)
- **styles.css**: CSS custom properties design system (1486 lines), mobile-first responsive design
- **script.js**: Modular vanilla JS (511 lines), component-based initialization pattern
- **images/**: Static assets (gallery-1.jpg through gallery-5.jpg, hero-bg.jpg)

### Design System (CSS Variables in :root)
- Colors: `--color-primary` (#1A5F4A green), `--color-gold` (#D4AF37), gray scale 100-900
- Typography: `--font-heading` (Poppins), `--font-body` (Inter)
- Spacing: `--space-xs` through `--space-4xl` (0.25rem to 6rem)
- Shadows: `--shadow-sm` through `--shadow-2xl` plus `--shadow-gold`

## JavaScript Architecture

### Initialization Pattern
All features initialized from single `DOMContentLoaded` listener calling individual `init*()` functions:
```javascript
initNavigation()
initScrollEffects()
initScrollAnimations()
initSmoothScroll()
initFormValidation()
initModal()
initTestimonialsCarousel()
initGalleryLightbox()
initFloatingButtons()
```

### Key Components

**Navigation** (`initNavigation`)
- Sticky header with `.scrolled` class on scroll (50px threshold)
- Mobile hamburger menu with body overflow control
- Active link highlighting based on scroll position
- Section tracking via `section[id]` elements with 100px offset

**Custom Scroll Animations** (`initScrollAnimations`)
- Custom AOS-like implementation using `[data-aos]` attributes
- Supports `data-aos-delay` for staggered animations
- Adds `.aos-animate` class at 150px from viewport bottom
- Animations include `fade-up`, `fade-left`, `fade-right`

**Form Validation** (`initFormValidation`)
- Real-time validation on submit: name, email regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), phone regex (`/^[0-9+]{10,14}$/`)
- Error handling via toast notifications (red, bottom-center, 3s duration)
- Success modal display after validation
- Form reset on successful submission

**Counter Animation** (`animateCounter`)
- Animates `.stat-number` elements in `.hero-stats` section
- Uses `requestAnimationFrame` for smooth counting
- One-time trigger when section enters viewport
- 1500ms duration with suffix preservation

**Testimonials Carousel** (`initTestimonialsCarousel`)
- Manual carousel with prev/next buttons and dot indicators
- Auto-play 6s interval with reset on manual interaction
- Slides use `[data-slide]` attribute
- Accessibility: `aria-hidden`, `aria-label` attributes

**Gallery Lightbox** (`initGalleryLightbox`)
- Click `.gallery-item img` to open fullscreen overlay
- Close on backdrop click, close button (×), or Escape key
- Dynamic overlay creation/removal (not pre-rendered)
- Cursor changes to `zoom-in` on hover

## Conventions & Patterns

### Naming Conventions
- CSS classes: kebab-case (`.hero-content`, `.package-card`)
- JavaScript functions: camelCase (`initNavigation`, `isValidEmail`)
- IDs: camelCase (`registerForm`, `navToggle`, `successModal`)

### Emoji Usage Throughout
- Navigation/branding: 🕌 (mosque icon)
- Package badges: 🌙 (regular), ⭐ (premium), 👑 (VIP)
- Feature icons: 🏆📖🏨💰✈️🤝
- Contact: 📞📧📍
- Social: 📘📷🎬💬
- Ratings: ⭐⭐⭐⭐⭐

### Responsive Breakpoints (inferred from CSS)
- Mobile-first approach
- Tablet: ~768px
- Desktop: ~1024px
- Max container width: 1200px (`--container-max`)

### Scroll Behavior
- Smooth scrolling enabled globally (`html { scroll-behavior: smooth }`)
- Scroll offset for anchors: 80px (`scroll-padding-top`)
- Header height compensation in `initSmoothScroll`: uses `offsetHeight`

## Development Workflow

### Running Locally
1. Open `index.html` directly in browser (no build process)
2. Or use VS Code Live Server extension for hot reload
3. No package manager, npm, or build tools required

### File Modifications
- **HTML changes**: Direct edit, refresh browser
- **CSS changes**: Modify `styles.css`, check responsive breakpoints
- **JS changes**: Edit `script.js`, ensure component init order preserved
- **Images**: Add to `images/` folder, update `src` attributes

### Testing Checklist
- Mobile menu toggle and close on link click
- Form validation: empty fields, invalid email/phone formats
- Carousel auto-play and manual navigation
- Gallery lightbox open/close behaviors
- Scroll animations trigger at correct viewport position
- Counter animation fires once on scroll

## Project-Specific Notes

### Backend Integration
- Form currently shows success modal without backend submission
- To integrate: replace `showModal()` in `initFormValidation` with fetch/XMLHttpRequest
- Form fields: name, email, phone, package (select), departure (select), message (textarea)

### Image Requirements
- Gallery expects: `gallery-1.jpg` through `gallery-5.jpg`
- Hero background: `hero-bg.jpg` (used in CSS `.hero` background-image)
- All images in `images/` folder with relative paths

### Indonesian Language Context
- All content in Bahasa Indonesia
- Currency format: "Rp 25 Juta" (million)
- Religious terminology: Umroh, Masjidil Haram, Masjid Nabawi, jamaah, ustadz
- Form labels and validation messages in Indonesian

### Accessibility Features
- `aria-label` on buttons (nav-toggle, carousel, back-to-top)
- `aria-hidden` for decorative/state-dependent elements
- `loading="lazy"` on gallery images
- Keyboard navigation: Escape key closes modal and lightbox
- Focus management in mobile menu (body overflow control)

## Common Tasks

**Add new package tier**: Clone `.package-card` in HTML, update price and features list, ensure consistent spacing in `.packages-grid` (CSS Grid, 3 columns on desktop)

**Modify color scheme**: Update CSS variables in `:root`, primary colors affect buttons, badges, highlights

**Add carousel slide**: Add `.testimonial-card[data-slide]` to `.testimonials-track`, carousel auto-detects and generates dots

**Change form fields**: Update HTML form inputs and `initFormValidation` validation logic, maintain regex patterns for email/phone

**Update statistics**: Modify `.stat-number` content in hero section, counter animation auto-detects and animates numeric values
