import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { TransactionProvider } from "./context/TransactionContext";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { TransactionsPage } from "./pages/TransactionsPage";

function AppContent() {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === "dashboard" ? <DashboardPage /> : <TransactionsPage />}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <TransactionProvider>
        <AppContent />
      </TransactionProvider>
    </AppProvider>
  );
}

export default App;
