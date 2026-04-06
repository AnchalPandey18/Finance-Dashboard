import { useState } from "react";
import { TransactionList } from "../components/transactions/TransactionList";
import { TransactionModal } from "../components/transactions/TransactionModal";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { PlusCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export function TransactionsPage() {
  const { role } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering state
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-2">
          {/* Filters */}
          <Input 
            placeholder="Search by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
          />
          <Select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-32"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>

          {/* Add Action - Admin Only */}
          {role === "admin" && (
            <Button onClick={() => setIsModalOpen(true)} className="gap-2 w-full md:w-auto">
              <PlusCircle className="w-4 h-4" />
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      <TransactionList searchQuery={search} typeFilter={typeFilter} />

      {isModalOpen && (
        <TransactionModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
