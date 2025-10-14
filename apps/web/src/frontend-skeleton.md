# Frontend Files Skeleton

This document outlines the structure and purpose of all frontend files in the SafePsy landing page application.

## Root Files

### `main.tsx`
- **Purpose**: Application entry point
- **Dependencies**: React, ReactDOM, App component, styles
- **Key Features**:
  - React 18 root rendering
  - Strict mode enabled
  - CSS imports

### `App.tsx`
- **Purpose**: Main application component with routing
- **Dependencies**: React Router, all page components
- **Key Features**:
  - BrowserRouter setup
  - Route definitions for all pages
  - Header with logo and tagline
  - Main content area
  - Footer component

### `styles.css`
- **Purpose**: Global styles and Tailwind CSS configuration
- **Key Features**:
  - Google Fonts imports (Titillium Web, Noto Sans)
  - Tailwind CSS layers
  - Custom component classes
  - Typography and color system
  - Button and input field styles

## Components Directory (`/components`)

### `Hero.tsx`
- **Purpose**: Landing page hero section
- **Features**: Main call-to-action, value proposition display

### `AboutUs.tsx`
- **Purpose**: About page component
- **Features**: Company information, team details, mission statement

### `ContactUs.tsx`
- **Purpose**: Contact page component
- **Features**: Contact form, company information, location details

### `SecurityAndPrivacyPolicy.tsx`
- **Purpose**: Security and privacy policy page
- **Features**: Legal compliance information, privacy practices

### `JoinOurWaitlist.tsx`
- **Purpose**: Waitlist signup component
- **Features**: Email collection form, user registration

### `EmailSignup.tsx`
- **Purpose**: Email subscription component
- **Features**: Newsletter signup, email validation

### `Footer.tsx`
- **Purpose**: Site footer component
- **Features**: Links, copyright, social media, contact info

## File Structure Overview

```
src/
├── main.tsx                 # Application entry point
├── App.tsx                  # Main app component with routing
├── styles.css              # Global styles and Tailwind config
└── components/
    ├── Hero.tsx            # Landing page hero section
    ├── AboutUs.tsx         # About page component
    ├── ContactUs.tsx       # Contact page component
    ├── SecurityAndPrivacyPolicy.tsx  # Privacy policy page
    ├── JoinOurWaitlist.tsx # Waitlist signup component
    ├── EmailSignup.tsx     # Email subscription component
    └── Footer.tsx          # Site footer component
```

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom components
- **Fonts**: Titillium Web (primary), Noto Sans (secondary)
- **Build Tool**: Vite (configured in project root)

## Key Design Patterns

1. **Component-based Architecture**: Each page/section is a separate component
2. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
3. **Consistent Styling**: Custom CSS classes for buttons, inputs, and typography
4. **Accessibility**: Focus states, semantic HTML, proper alt tags
5. **Performance**: Lazy loading, optimized images, efficient routing

## Color Scheme

- **Primary**: Gradient from primary-600 to secondary-600
- **Text**: #001515 (dark teal)
- **Background**: Gradient from neutral-light via white to neutral-dark
- **Accents**: Primary and secondary color variations

## Typography

- **Headings**: Titillium Web, 600 weight
- **Body Text**: Titillium Web, 400 weight
- **Web-safe Text**: Noto Sans, 300 weight
- **Font Sizes**: Responsive scaling with Tailwind classes
