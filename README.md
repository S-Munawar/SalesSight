# Sales Dashboard (Next.js 15 + Atomic Design + TypeScript)

A modern sales dashboard application built with Next.js 15, TypeScript, TailwindCSS, and Recharts. This project demonstrates the Atomic Design methodology for creating scalable and maintainable React components.

## 🚀 What this project does

- **Demonstrates Atomic Design** in Next.js with a clear component hierarchy
- **Displays sales data** for 2022-2024 using interactive charts
- **Built with TailwindCSS** for responsive, utility-first styling
- **Uses Recharts** for beautiful, customizable data visualizations
- **TypeScript** for type safety and better developer experience

## 📁 Project Structure

```
/src
  /app
    /dashboard
      page.tsx          # Main dashboard page
    /api
      /sales
        route.ts        # API endpoint for sales data
  /components
    /atoms              # Basic building blocks
      Heading.tsx       # Reusable heading component
      Input.tsx         # Input field component
      Button.tsx        # Button component
      index.ts          # Barrel export
    /molecules          # Combinations of atoms
      ChartTitle.tsx    # Chart title with subtitle
      FilterInput.tsx   # Threshold filter input
      ChartTypeSelector.tsx # Chart type toggle buttons
      index.ts          # Barrel export
    /organisms          # Complex UI components
      SalesChart.tsx    # Main chart component with all features
      index.ts          # Barrel export
  /data
    sales.json          # Mock sales data
  /hooks
    useSalesData.ts     # Hook for fetching sales data
```

## 🏗️ Architecture: Atomic Design

This project follows the **Atomic Design** methodology:

| Level | Description | Examples |
|-------|-------------|----------|
| **Atoms** | Basic HTML elements with styling | `Heading`, `Input`, `Button` |
| **Molecules** | Groups of atoms working together | `ChartTitle`, `FilterInput`, `ChartTypeSelector` |
| **Organisms** | Complex UI components | `SalesChart` |
| **Pages** | Full page layouts | `/dashboard` |

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Package Manager**: pnpm

## 📊 Features

### Current Features

- ✅ **Sales Chart** - Visualize annual sales data
- ✅ **Multiple Chart Types** - Toggle between Bar, Line, and Pie charts
- ✅ **Threshold Highlighting** - Highlight bars exceeding a custom threshold
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Dark Mode Support** - Automatic dark mode styling
- ✅ **API Ready** - `/api/sales` endpoint for data fetching

### Coming Soon

- 🔄 Real-time API data integration
- 📤 Export to PDF/Excel
- 📈 Comparative analysis tools
- 🔍 Advanced filtering options

## 🚀 How to Run

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nextjs-template

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Access the Dashboard

Open your browser and navigate to:
```
http://localhost:3000/dashboard
```

### API Endpoint

Sales data is available at:
```
GET http://localhost:3000/api/sales
```

## 📦 Mock Data Structure

```json
[
  { "year": 2022, "sales": 53000 },
  { "year": 2023, "sales": 67500 },
  { "year": 2024, "sales": 89200 }
]
```

## 🎨 Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| `Heading.tsx` | Reusable heading element (h1-h6) with consistent styling |
| `Input.tsx` | Form input field with label support |
| `Button.tsx` | Customizable button with variants (primary, secondary, outline) |
| `ChartTitle.tsx` | Displays chart name and optional subtitle |
| `FilterInput.tsx` | Threshold input for highlighting data |
| `ChartTypeSelector.tsx` | Buttons to toggle between chart types |
| `SalesChart.tsx` | Main organism that fetches data and renders charts |

## 🔧 Customization

### Adding New Data

Update `src/data/sales.json` with your sales data:

```json
[
  { "year": 2022, "sales": 53000 },
  { "year": 2023, "sales": 67500 },
  { "year": 2024, "sales": 89200 },
  { "year": 2025, "sales": 105000 }
]
```

### Switching to API Data

In `src/hooks/useSalesData.ts`, uncomment the API fetch code:

```typescript
const fetchSalesData = async (): Promise<SalesData[]> => {
  const response = await fetch('/api/sales');
  if (!response.ok) throw new Error('Failed to fetch sales data');
  return response.json();
};
```

## 📄 License

MIT License - feel free to use this project as a template for your own applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js 15 and Atomic Design principles
