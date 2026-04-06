import { LayoutDashboard, Receipt, Moon, Sun, User } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Button } from "./ui/Button";

export function Layout({ children, currentView, onViewChange }) {
  const { role, setRole, theme, toggleTheme } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar / Top Nav */}
      <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-4 md:p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">₹</span>
          </div>
          <span className="font-bold text-xl tracking-tight hidden md:block">FinDash</span>
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 p-4 md:p-4 md:pt-0 overflow-x-auto flex-1">
          <Button 
            variant={currentView === "dashboard" ? "secondary" : "ghost"} 
            className="justify-start gap-2"
            onClick={() => onViewChange("dashboard")}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden md:inline">Dashboard</span>
          </Button>
          <Button 
            variant={currentView === "transactions" ? "secondary" : "ghost"} 
            className="justify-start gap-2"
            onClick={() => onViewChange("transactions")}
          >
            <Receipt className="w-4 h-4" />
            <span className="hidden md:inline">Transactions</span>
          </Button>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Role: {role}</span>
            </div>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          
          <Button variant="outline" size="sm" onClick={toggleTheme} className="w-full justify-center gap-2">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden md:inline">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center px-4 md:px-8 shrink-0">
          <h1 className="text-xl font-semibold capitalize">{currentView}</h1>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
