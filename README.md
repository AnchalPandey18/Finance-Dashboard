# 💰 FinDash — Personal Finance Dashboard

A sleek, modern **personal finance dashboard** built with React and Tailwind CSS. Track your income & expenses, visualize spending patterns with interactive charts, and get smart financial insights — all in a beautiful, responsive interface with dark mode support.

---

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards** — View your total balance, income, and expenses at a glance (₹ INR currency)
- **Balance Trend Chart** — Interactive area chart showing your balance over time (powered by Recharts)
- **Spending Breakdown** — Donut chart categorizing your expenses by type
- **Financial Insights** — Smart observations highlighting your highest spending category and financial health

### 💳 Transaction Management
- **Add / Edit / Delete** transactions with a clean modal form
- **Search & Filter** — Find transactions by name and filter by type (Income / Expense)
- **Categorized Entries** — Organize transactions under categories like Salary, Groceries, Transport, Utilities, Freelance, etc.

### 🔐 Role-Based Access Control
- **Admin** — Full access: add, edit, and delete transactions
- **Viewer** — Read-only access: view dashboard and transactions without modification

### 🌗 Dark / Light Mode
- Toggle between dark and light themes with a single click
- Theme preference persisted in `localStorage`

### 💾 Persistent Data
- All transactions, theme preference, and user role are saved to `localStorage`
- Data survives page refreshes — no backend required

### 📱 Fully Responsive
- Adaptive sidebar navigation (collapses on mobile)
- Mobile-friendly layouts for all pages and components

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library (hooks, context, reducer) |
| [Vite 7](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Recharts](https://recharts.org/) | Data visualization (Area & Pie charts) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [date-fns](https://date-fns.org/) | Date formatting & parsing |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging utility |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or any package manager of your choice)

 ### Project Structure
 
Finance-Dashboard/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives
│   │   │   ├── Button.jsx      #   Button with variants
│   │   │   ├── Card.jsx        #   Card, CardHeader, CardTitle, etc.
│   │   │   ├── Input.jsx       #   Styled input field
│   │   │   └── Select.jsx      #   Styled select dropdown
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── SummaryCards.jsx #   Balance / Income / Expense cards
│   │   │   ├── BalanceChart.jsx #   Area chart — balance over time
│   │   │   ├── SpendingBreakdown.jsx  # Donut chart — expenses by category
│   │   │   └── Insights.jsx    #   Financial observations
│   │   ├── transactions/       # Transaction-specific components
│   │   │   ├── TransactionList.jsx    # Filterable transaction table
│   │   │   └── TransactionModal.jsx   # Add/Edit transaction form
│   │   └── Layout.jsx          # App shell — sidebar + main content
│   ├── context/
│   │   ├── AppContext.jsx      # Theme & role state (Context API)
│   │   └── TransactionContext.jsx  # Transaction state (useReducer)
│   ├── pages/
│   │   ├── DashboardPage.jsx   # Dashboard view
│   │   └── TransactionsPage.jsx # Transactions view
│   ├── utils/
│   │   └── cn.js               # clsx + tailwind-merge helper
│   ├── App.jsx                 # Root component with providers
│   ├── main.jsx                # React DOM entry point
│   └── index.css               # Tailwind directives
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json

### Architecture

AppProvider (Theme + Role)
  └── TransactionProvider (Transactions via useReducer)
        └── Layout (Sidebar + Header + Main)
              ├── DashboardPage
              │     ├── SummaryCards
              │     ├── BalanceChart
              │     ├── SpendingBreakdown
              │     └── Insights
              └── TransactionsPage
                    ├── TransactionList
                    └── TransactionModal

🤝 Contributing

Contributions are welcome! Feel free to:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License

This project is open source and available under the 

MIT License
.

Built with ❤️ using React + Vite + Tailwind CSS

```
