# CryptoCast Frontend 🎨

The frontend of CryptoCast is a modern React application built with TypeScript and Vite. It provides an interactive dashboard for viewing cryptocurrency predictions, real-time data, and beautiful visualizations.

## 🏗️ Architecture

```
Frontend/
├── src/
│   ├── Components/              # Reusable UI components
│   │   ├── Button.tsx          # Custom button component
│   │   ├── Chart.tsx           # Chart visualization component
│   │   ├── CurrCard.tsx        # Currency card component
│   │   ├── Maint.tsx           # Main content component
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── PredictionCard.tsx  # Prediction display card
│   │   ├── TextFade.tsx        # Text animation component
│   │   ├── particleBakground.tsx # Particle effects
│   │   └── ui/                 # Shadcn UI components
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       └── select.tsx
│   ├── Pages/                   # Main application pages
│   │   ├── Landing.tsx         # Landing page
│   │   └── MainPage.tsx        # Main dashboard
│   ├── assets/                 # Static assets
│   │   ├── CryptoCast_logo.png
│   │   └── react.svg
│   ├── config/                 # Configuration files
│   │   └── particle-config.ts  # Particle effect config
│   ├── lib/                    # Utility libraries
│   │   └── utils.ts           # Utility functions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/                     # Public assets
│   ├── CryptoCast_logo.png
│   └── vite.svg
├── Dockerfile                  # Docker configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

## 🎯 Features

### 🌟 Core Features

- **Real-time Dashboard**: Live cryptocurrency data and predictions
- **Interactive Charts**: Beautiful data visualizations using Recharts
- **Smooth Animations**: Framer Motion for enhanced UX
- **Type Safety**: Full TypeScript implementation

### 🎨 UI Components

- **Currency Cards**: Display current prices and trends
- **Prediction Cards**: Show ML predictions with confidence indicators
- **Interactive Charts**: Real-time price charts and historical data
- **Navigation**: Clean, modern navigation bar
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

## 🛠️ Tech Stack

### Core Technologies

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Beautiful, accessible component library
- **Framer Motion**: Animation library for React
- **Lucide React**: Beautiful icon library
- **Class Variance Authority**: Type-safe component variants

### Data Visualization

- **Recharts**: Powerful charting library for React
- **React Particles**: Interactive particle effects
- **TSParticles**: Advanced particle system

### API & State Management

- **Axios**: HTTP client for API requests
- **React Hooks**: Built-in state management

## 🚀 Development Setup

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn package manager

### Local Development

1. **Navigate to Frontend Directory**

   ```bash
   cd Frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:5173`

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Preview Production Build**

   ```bash
   npm run preview
   ```

6. **Lint Code**
   ```bash
   npm run lint
   ```

### Available Scripts

```json
{
  "dev": "vite", // Start development server
  "build": "tsc -b && vite build", // Build for production
  "lint": "eslint .", // Run ESLint
  "preview": "vite preview" // Preview production build
}
```

## 🐳 Docker Configuration

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Key Features:

- **Alpine Linux**: Lightweight base image
- **Multi-stage Build**: Optimized production build
- **Static File Serving**: Uses `serve` for production
- **Port 3000**: Configured for Docker Compose

## 🎨 Component Architecture

### Page Components

#### Landing Page (`Pages/Landing.tsx`)

- Hero section with animated text
- Feature highlights
- Call-to-action buttons
- Particle background effects

#### Main Dashboard (`Pages/MainPage.tsx`)

- Real-time cryptocurrency data
- Prediction cards for BTC and ETH
- Interactive charts
- Navigation between different views

### UI Components

#### Currency Card (`Components/CurrCard.tsx`)

```tsx
interface CurrCardProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
  trend: "up" | "down";
}
```

#### Prediction Card (`Components/PredictionCard.tsx`)

```tsx
interface PredictionProps {
  currentPrice: string;
  predictedPrice: string;
  priceChange: string;
  trend: string;
  timestamp: string;
}
```

#### Chart Component (`Components/Chart.tsx`)

- Recharts integration
- Real-time data updates
- Multiple chart types (line, area, candlestick)
- Responsive design

## 🎯 API Integration

### Backend Communication

```typescript
// API service example
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const api = {
  getBitcoinPrediction: () => axios.get(`${API_BASE_URL}/btc`),
  getEthereumPrediction: () => axios.get(`${API_BASE_URL}/eth`),
};
```

### Data Flow

1. **API Calls**: Components fetch data using Axios
2. **State Management**: React hooks manage component state
3. **Error Handling**: Try-catch blocks with user feedback
4. **Loading States**: Spinners and skeletons during data fetch

## 🎨 Styling System

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      animations: {
        // Custom animations
      },
    },
  },
  plugins: [],
};
```

### Design System

- **Colors**: Consistent color palette for crypto themes
- **Typography**: Modern font stack with good readability
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Optimizations

- Touch-friendly interface
- Optimized chart interactions
- Condensed navigation
- Performance optimizations

## ⚡ Performance Optimizations

### Build Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Image and font optimization
- **Bundle Analysis**: Monitor bundle size

### Runtime Optimizations

- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Optimize expensive calculations
- **Lazy Loading**: Load components on demand
- **Error Boundaries**: Graceful error handling

## 🔧 Development Tools

### ESLint Configuration

```javascript
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

### TypeScript Configuration

- Strict type checking enabled
- Path mapping for cleaner imports
- Modern ES modules support

## 🧪 Testing (Future Enhancement)

### Recommended Testing Stack

- **Vitest**: Fast unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Static Hosting

- **Vercel**: Recommended for React apps
- **Netlify**: Easy deployment with form handling
- **AWS S3 + CloudFront**: Scalable static hosting

### Environment Variables

```env
VITE_API_URL=https://api.cryptocast.com
VITE_APP_NAME=CryptoCast
```

## 🎯 Future Enhancements

### Planned Features

- [ ] Dark/Light theme toggle
- [ ] Advanced chart controls
- [ ] Real-time WebSocket connections
- [ ] Portfolio tracking
- [ ] Mobile app (React Native)
- [ ] PWA capabilities
- [ ] Advanced animations
- [ ] Multi-language support

### Technical Improvements

- [ ] Unit test coverage
- [ ] E2E test automation
- [ ] Bundle size optimization
- [ ] Accessibility improvements
- [ ] Performance monitoring

## 🤝 Contributing

### Development Guidelines

1. **Component Structure**: Use functional components with hooks
2. **TypeScript**: Always type your props and state
3. **Styling**: Use Tailwind CSS classes
4. **Code Quality**: Follow ESLint rules
5. **Performance**: Optimize re-renders and bundle size

### Component Template

```tsx
import React from "react";

interface ComponentProps {
  // Define your props here
}

export const Component: React.FC<ComponentProps> = (
  {
    // Destructure props
  }
) => {
  return <div className="">{/* Component JSX */}</div>;
};
```

## 📞 Support

For frontend-specific issues:

- Check browser developer console
- Verify API connectivity
- Test responsive design on different devices
- Monitor network requests

---

**💡 Tip**: Use React Developer Tools browser extension for debugging React components and performance profiling.
