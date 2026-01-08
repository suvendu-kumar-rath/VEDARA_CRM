# VEDARA CRM Dashboard

A modern, dark-mode admin dashboard for an interior design studio built with React, Vite, and Tailwind CSS.

## Features

- 📊 Dashboard Overview with key metrics
- 📁 Project Progress tracking with visual progress bars
- 💰 Payment Overview with interactive pie chart
- 📋 Recent Activity feed
- 📈 Quick Stats panel
- 🎨 Fully responsive design
- 🌙 Dark mode optimized UI
- ⚡ Built with Vite for fast development

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Design System** - Yellow accent (#FFD600) with dark theme

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  components/
    Sidebar.jsx          # Left navigation sidebar
    Header.jsx           # Top header with search and actions
    StatCards.jsx        # Key metrics cards
    ProjectProgress.jsx  # Project tracking with progress bars
    PaymentOverview.jsx  # Payment pie chart visualization
    RecentActivity.jsx   # Activity feed
    QuickStats.jsx       # Quick statistics panel
  App.jsx               # Main application component
  main.jsx              # Application entry point
  index.css             # Global styles and Tailwind imports
```

## Customization

The color scheme can be customized in `tailwind.config.js`:

```js
colors: {
  dark: "#111111",           // Main background
  "dark-light": "#181818",   // Card backgrounds
  accent: "#FFD600",         // Primary accent color
  "gray-border": "#232323",  // Border color
  "gray-text": "#B0B0B0",    // Secondary text
}
```

## Component Overview

- **Sidebar**: Navigation menu with brand logo and user profile
- **Header**: Search bar with notification and user icons
- **StatCards**: Four metric cards showing key business indicators
- **ProjectProgress**: List of projects with completion percentages
- **PaymentOverview**: Pie chart showing received vs pending payments
- **RecentActivity**: Chronological list of recent events
- **QuickStats**: Summary of important business metrics

## License

MIT
