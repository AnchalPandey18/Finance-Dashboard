import { useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { X } from "lucide-react";
import { format } from "date-fns";

export function TransactionModal({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useTransactionContext();
  const isEditing = !!transaction;

  const [formData, setFormData] = useState({
    name: transaction?.name || "",
    amount: transaction?.amount || "",
    category: transaction?.category || "General",
    type: transaction?.type || "expense",
    date: transaction?.date || format(new Date(), "yyyy-MM-dd"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.date) return;

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (isEditing) {
      editTransaction({ ...payload, id: transaction.id });
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-0">
      <div className="bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-50 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-xl shadow-lg relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white dark:ring-offset-slate-900 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold leading-none tracking-tight mb-4">
            {isEditing ? "Edit Transaction" : "Add Transaction"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Type</label>
              <Select 
                value={formData.type} 
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Name / Description</label>
              <Input 
                required 
                placeholder="e.g. Grocery" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Amount (₹)</label>
              <Input 
                required 
                type="number" 
                step="0.01"
                min="0"
                placeholder="0.00" 
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <Input 
                required 
                placeholder="e.g. Food, Transport, Salary" 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Date</label>
              <Input 
                required 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Save Transaction"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
