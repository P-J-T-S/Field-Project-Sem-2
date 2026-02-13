# 🏥 DMCT Hospital & Old Age Home Website

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A compassionate, professional website for DMCT Hospital & Old Age Home, serving the elderly with love and care for over 15 years.

[Live Demo](#) • [Report Bug](https://github.com/yourusername/dmct-hospital/issues) • [Request Feature](https://github.com/yourusername/dmct-hospital/issues)

</div>

---

## ✨ Features

- 💚 **Compassionate Design** - Warm, healing color palette that conveys trust and comfort
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- 🎨 **Custom Theme** - Beautiful Tailwind CSS v4 theme with earth tones and sage greens
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎯 **Easy Navigation** - Clean, intuitive user interface
- 🌊 **Smooth Animations** - Professional fade-in and scroll effects
- ♿ **Accessible** - WCAG compliant, keyboard navigable
- 📞 **Click-to-Call** - Direct phone integration throughout the site

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI Library |
| Vite | 5.4 | Build Tool & Dev Server |
| Tailwind CSS | v4 | Styling Framework |
| Context API | - | State Management |
| Google Fonts | - | Typography (Crimson Pro & DM Sans) |

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dmct-hospital.git
   cd dmct-hospital
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📸 Screenshots

### Home Page
- Hero section with clear call-to-action
- About Us introduction
- Key services overview
- Mission statement
- Contact information

### Services Page
- Detailed service descriptions
- Comprehensive facility information
- Safe environment values
- Contact integration

## 🎨 Design System

### Color Palette

The website uses a warm, compassionate color scheme:

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Warmth 50 | `#fdf9f6` | Background |
| Warmth 100 | `#faf2ea` | Light backgrounds |
| Sage 600 | `#557055` | Primary green |
| Sage 700 | `#455a45` | Dark green accents |
| Earth 600 | `#8b6a4f` | Secondary brown |
| Earth 900 | `#4d3b2f` | Text color |

### Typography

- **Display Font**: Crimson Pro (serif) - For headings and titles
- **Body Font**: DM Sans (sans-serif) - For body text and UI elements

### Customization

You can easily customize the theme by editing `src/index.css`:

```css
@theme {
  --color-warmth-500: #c99a6e;
  --color-sage-500: #6d8c6d;
  --color-earth-500: #a88567;
}
```

## Project Structure

```
dmct-hospital/
├── index.html                  # Entry HTML file
├── package.json                # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── src/
│   ├── main.jsx               # Application entry point
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles and Tailwind config
│   ├── context/
│   │   └── AppContext.jsx     # App state management
│   ├── components/
│   │   └── Navigation.jsx     # Navigation header
│   └── pages/
│       ├── HomePage.jsx       # Home page
│       └── ServicesPage.jsx   # Services page
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Design Features

### Color Palette
- **Warmth**: Soft beige and cream tones for comfort
- **Sage**: Calming green tones for healing
- **Earth**: Rich brown tones for trust and stability

### Typography
- **Display Font**: Crimson Pro (serif) - Elegant and readable
- **Body Font**: DM Sans (sans-serif) - Clean and modern

### Animations
- Fade-in effects on page load
- Slide-up animations for content sections
- Staggered animations for multiple elements
- Smooth hover transitions on interactive elements

## Pages

### Home Page
- Hero section with call-to-action
- About Us section
- Key Services preview
- Our Mission
- Support Our Cause
- Contact information

### Services Page
- Comprehensive service details
- 6 main service categories
- Safe environment values
- Contact call-to-action

## Context Management

The app uses React Context API for:
- Current page navigation
- Mobile menu state
- Smooth page transitions

## Customization

To customize the colors, edit the CSS variables in `src/index.css`:
```css
@theme {
  --color-warmth-500: #c99a6e;
  --color-sage-500: #6d8c6d;
  --color-earth-500: #a88567;
}
```

## Contact Information

**DMCT Hospital & Old Age Home**
- Phone: 7977211807 | 7400439760
- Location: Chakki Naka, Kalyan East, Maharashtra – 421306

## License

This project is created for DMCT Hospital & Old Age Home.
