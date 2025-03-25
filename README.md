# FinScope - AI-Powered Financial Health Dashboard

FinScope is a modern financial health dashboard built with **Next.js**, **Tailwind CSS**, and **Radix UI** components. It provides users with insights into their financial health, spending trends, investment performance, and more, powered by AI-driven recommendations.

## Features

### 1. **Dashboard Overview**
   - Displays a high-level summary of financial health.
   - Includes components like:
     - **Financial Health Score**: AI-generated score with detailed factors.
     - **AI Recommendations**: Smart financial advice tailored to user data.
     - **Spending Analysis**: Visual breakdown of spending patterns.
     - **Investment Insights**: Portfolio allocation and performance.
     - **Recent Transactions**: List of recent financial activities.

### 2. **Spending Page**
   - Detailed spending analysis with:
     - Total spending.
     - Highest spending category.
     - Transaction breakdown.
     - Spending trends over time.

### 3. **Investments Page**
   - Comprehensive investment tracking:
     - Total portfolio value.
     - Year-to-date (YTD) returns.
     - Asset allocation visualization.
     - Historical performance charts.
     - Top holdings with detailed metrics.

### 4. **Dark Mode Support**
   - Fully responsive design with light and dark mode themes.
   - Theme switching powered by `next-themes`.

### 5. **Interactive Components**
   - Built with **Radix UI** primitives for accessibility and customization.
   - Includes components like:
     - Tabs
     - Dropdown menus
     - Progress bars
     - Circular progress indicators
     - Dialogs and sheets

## Tech Stack

### **Frontend**
- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible and customizable UI primitives.
- **Recharts**: Library for building responsive charts and graphs.
- **Framer Motion**: Animation library for smooth transitions.

### **Utilities**
- **clsx** and **tailwind-merge**: For conditional class merging.
- **Lucide Icons**: Icon library for consistent visuals.

### **Development Tools**
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **ESLint**: Linting for code quality and consistency.
- **PostCSS**: CSS processing.


## Key Files

### **Tailwind Configuration**
- File: [`tailwind.config.ts`](tailwind.config.ts)
- Customizes themes, colors, and responsive breakpoints.
- Includes support for dark mode and custom CSS variables.

### **Dashboard Components**
- **Financial Health Score**: [`src/components/dashboard/financial-health-score.tsx`](src/components/dashboard/financial-health-score.tsx)
- **Spending Analysis**: [`src/components/dashboard/spending-analysis.tsx`](src/components/dashboard/spending-analysis.tsx)
- **Investment Insights**: [`src/components/dashboard/investment-insights.tsx`](src/components/dashboard/investment-insights.tsx)
- **Recent Transactions**: [`src/components/dashboard/recent-transactions.tsx`](src/components/dashboard/recent-transactions.tsx)

### **UI Components**
- **Card**: [`src/components/ui/card.tsx`](src/components/ui/card.tsx)
- **Tabs**: [`src/components/ui/tabs.tsx`](src/components/ui/tabs.tsx)
- **Dropdown Menu**: [`src/components/ui/dropdown-menu.tsx`](src/components/ui/dropdown-menu.tsx)
- **Circular Progress**: [`src/components/ui/custom/circular-progress.tsx`](src/components/ui/custom/circular-progress.tsx)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Goyam02/Fintech.git
   cd Fintech

2. Install dependencies:
    ```bash 
    bun install

3. Run the development server:
    ```bash
    bun run dev

4. Open http://localhost:3000 in your browser.

### License
This project is licensed under the MIT License.

