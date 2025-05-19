# Contributing to rayperez-site

Thank you for considering contributing to this project! This document outlines the process for contributing to the project, including how to report bugs, suggest improvements, and submit pull requests.

## Table of Contents

- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Performance Optimization Guidelines](#performance-optimization-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Project Structure](#project-structure)
- [SEO Guidelines](#seo-guidelines)
- [Style Guide](#style-guide)

## Development Setup

### Prerequisites

- Node.js (version 18 or later recommended)
- npm or yarn

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/rayperez-site.git
   cd rayperez-site
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. The site should now be running at `http://localhost:5173`

## Coding Standards

This project uses ESLint and Prettier to enforce consistent code style. Before submitting a pull request, make sure your code follows these standards:

1. Run the linter:

   ```bash
   npm run lint
   # or
   yarn lint
   ```

2. Format your code:
   ```bash
   npm run format
   # or
   yarn format
   ```

### TypeScript Guidelines

- Use TypeScript for all new files
- Define explicit types for function parameters and return values
- Use interfaces for complex object types
- Avoid the use of `any` where possible

### React Guidelines

- Use functional components with hooks instead of class components
- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Use Material UI components for consistent UI
- Follow the established component structure pattern
- Use lazy loading for route components and heavy UI elements
- Prefer the `LazySyntaxHighlighter` component for code blocks instead of importing SyntaxHighlighter directly

## Performance Optimization Guidelines

This project implements several performance optimizations that should be maintained:

### Code Splitting

- All page components are loaded with React.lazy for code splitting
- The main syntax highlighter library is lazy-loaded to reduce initial bundle size

### Bundle Optimization

- The build system uses manual chunk splitting to separate vendor code
- External libraries are grouped by category (UI, routing, etc.) to optimize caching
- When adding new dependencies, consider updating the `manualChunks` configuration in vite.config.ts

### Loading States

- Always use the `LoadingFallback` component as the fallback for Suspense
- The loading screen maintains a dark theme to prevent flash of white background
- When creating new lazy-loaded components, provide meaningful loading indicators

## Pull Request Process

1. Create a new branch from `main` (see [branch naming conventions](#branch-naming-conventions))
2. Make your changes and commit them with [meaningful commit messages](#commit-message-guidelines)
3. Push your branch to your fork on GitHub
4. Open a pull request against the `main` branch of the original repository
5. Fill out the pull request template with details about your changes
6. Wait for review and address any feedback

### Pull Request Requirements

- All linting and formatting checks must pass
- Code should build without errors
- New features should include documentation
- Update the CHANGELOG.md if applicable

## Issue Reporting

When reporting issues, please use the provided issue templates and include:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. System information:
   - Browser and version
   - Operating system
   - Any relevant environment details

## Branch Naming Conventions

Use the following format for branch names:

- `feature/short-description` - For new features
- `fix/short-description` - For bug fixes
- `docs/short-description` - For documentation changes
- `refactor/short-description` - For code refactoring
- `style/short-description` - For styling changes
- `test/short-description` - For adding or updating tests

## Commit Message Guidelines

Follow these guidelines for commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Example commit message:

```
Add skill section component for the home page

- Create Skills.tsx component
- Add skill items with links to articles
- Implement responsive grid layout

Fixes #123
```

## Testing Guidelines

When adding new features or fixing bugs, consider adding tests to ensure functionality doesn't break in the future.

## Project Structure

```
rayperez-site/
├── public/             # Static assets
├── src/
│   ├── assets/         # Project assets (images, fonts, etc.)
│   ├── components/     # Reusable React components
│   │   ├── LoadingFallback.tsx  # Loading indicator for lazy-loaded components
│   │   ├── LazySyntaxHighlighter.tsx # Lazy-loaded code syntax highlighter
│   │   ├── SyntaxHighlighterWithTheme.tsx # Implementation for syntax highlighting
│   │   ├── ProfileCard.tsx   # User profile information
│   │   ├── RecentPosts.tsx   # Recent articles sidebar component
│   │   └── ...
│   ├── pages/          # Page components (lazy-loaded)
│   │   └── articles/   # Blog article pages
│   ├── static/         # Static content
│   ├── App.tsx         # Main App component with route definitions
│   └── main.tsx        # Entry point with preloading configuration
├── index.html          # HTML template
├── vite.config.ts      # Build configuration with optimizations
└── package.json        # Project dependencies and scripts
```

### Component Guidelines

- Place all reusable components in the `src/components` directory
- Each component should have its own file
- Use consistent naming: PascalCase for component files (e.g., `ProfileCard.tsx`)
- When modifying data-driven components like `RecentPosts.tsx`, ensure the data is accurate and up-to-date
- Use the `LazySyntaxHighlighter` component for code blocks in articles instead of importing the syntax highlighter directly

### Page Guidelines

- Place all page components in the `src/pages` directory
- Article pages should go in the `src/pages/articles` directory
- Follow the established article structure for consistency
- When adding new article pages, update the post list in `RecentPosts.tsx` to include the new article

## SEO Guidelines

This project follows several SEO best practices:

### Internal Linking

- The `RecentPosts` component provides internal linking between article pages with an enhanced visual design
- When adding new articles, ensure they are added to the `posts` array in `RecentPosts.tsx`
- Use the following format for each post:
  ```typescript
  {
    title: 'Article Title',
    path: '/article-path',
  }
  ```
- Keep the most recent 5 articles in the list, sorted by recency (newest first)
- The component uses visual cues like icons and hover effects to encourage exploration of content

### Recent Posts Design Principles

- The Recent Posts sidebar component follows these design principles:
  - Prominent header with contrasting color and an icon for immediate recognition
  - Clean, uncluttered links with arrow indicators suggesting navigation
  - Interactive elements with subtle animations (transform on hover)
  - Clear separation between items using dividers
  - Responsive design that collapses on mobile devices but expands by default on desktop
  - Toggle functionality allowing users to expand/collapse the list as needed
  - Accessibility features including proper ARIA attributes for the toggle button
  - Smooth animations for expanding and collapsing using Material UI's Collapse component
  - A consistent visual language that matches the site's Material UI theme

### Structured Data

- All blog posts use Schema.org structured data via `react-schemaorg`
- The `BlogPost` component handles the structured data for articles
- The `Home` page uses Person schema for the author information
- Ensure all new pages have appropriate structured data

## Style Guide

This section details the design guidelines and styling standards that should be followed when developing for this site.

### Color Scheme

The site uses a dark theme with the following color palette:

- **Primary Background**: `#121212` - Used for page backgrounds and the loading screen
- **Secondary Background**: `#2d2d2d` - Used for code blocks, cards, and elevated surfaces
- **Primary Text**: `#ffffff` (with various opacity levels) - Main text color
- **Secondary Text**: Material UI's `text.secondary` - Used for less prominent text
- **Primary Accent**: Material UI's `primary.main` - Used for icons, links, and emphasis
- **Dividers**: Material UI's `divider` - Used for separating content sections

When creating new components:

- Use the ThemeProvider and access colors through the theme object
- Don't hardcode hex values except when absolutely necessary
- Maintain the dark mode aesthetic across all components

Example of proper color usage:

```tsx
import { useTheme } from '@mui/material/styles'

const MyComponent: React.FC = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider,
      }}
    >
      {/* Component content */}
    </Box>
  )
}
```

### Typography

- Use Material UI's Typography component for consistent text styling
- Follow this hierarchy for content:
  - `h1`: Main page titles
  - `h2`: Section headings
  - `h3`: Subsection headings
  - `body1`: Primary content text
  - `body2`: Secondary content text
  - `caption`: Caption text for images and notes

Example:

```tsx
<Typography variant="h1" component="h1">Page Title</Typography>
<Typography variant="h2" component="h2">Section Heading</Typography>
<Typography variant="body1">Main content text.</Typography>
```

### Spacing & Layout

- Use Material UI's spacing system through the `theme.spacing()` function
- Common spacing values:
  - `theme.spacing(1)` - 8px - Minimum spacing between related elements
  - `theme.spacing(2)` - 16px - Standard spacing between components
  - `theme.spacing(3)` - 24px - Section spacing

For container padding and margins:

- Desktop: Use `theme.spacing(3)` (24px) minimum
- Mobile: Use `theme.spacing(2)` (16px) minimum

### Component Styling

- Use Material UI's `sx` prop for styling components
- For complex or reusable styles, create a dedicated styles object
- Follow this structure for component files with styles:

```tsx
import { Box, styled } from '@mui/material'

// Option 1: Using styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}))

// Option 2: Using sx prop
const MyComponent: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      {/* Component content */}
    </Box>
  )
}
```

### UI Elements

#### Cards and Containers

- Use Material UI's `Paper` component for cards and elevated content
- Apply consistent elevation levels:
  - Level 1 (`elevation={1}`): For most cards and containers
  - Level 2-3 (`elevation={2-3}`): For highlighted or interactive elements
  - Level 4+ (`elevation={4+}`): Reserved for modals and dialogs

#### Navigation and Links

- Text links should use the `primary.main` color
- Apply hover effects for better interactivity
- Use Material UI's `Link` component for text links and `Button` for action links
- Include appropriate icons where applicable

#### Forms and Inputs

- Use Material UI form components
- Provide validation and feedback for all input fields
- Maintain consistent label and helper text patterns

#### Icons

- Use Material UI icons (`@mui/icons-material`) for all iconography
- Keep icons at standard sizes:
  - `fontSize="small"` - For inline or compact areas
  - `fontSize="medium"` (default) - For most interface elements
  - `fontSize="large"` - For prominent features and headers

### Responsiveness

- Use Material UI's `Grid` system for complex layouts
- Implement responsive breakpoints consistently:
  - `xs`: 0-599px (mobile)
  - `sm`: 600-899px (tablet)
  - `md`: 900-1199px (desktop)
  - `lg`: 1200px+ (large desktop)

Example:

```tsx
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Content that takes full width on mobile, half on tablet, third on desktop */}
  </Grid>
</Grid>
```

### Accessibility

- Maintain a minimum contrast ratio of 4.5:1 for text
- Use semantic HTML elements
- Include proper ARIA attributes for interactive elements
- Ensure all interactive elements have focus states
- Support keyboard navigation for all interactive features

---

Thank you for contributing to rayperez-site!
