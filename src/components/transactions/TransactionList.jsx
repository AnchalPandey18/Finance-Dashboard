import { useTransactionContext } from "../../context/TransactionContext";
import { useAppContext } from "../../context/AppContext";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { format, parseISO } from "date-fns";
import { ArrowDownRight, ArrowUpRight, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { TransactionModal } from "./TransactionModal";

export function TransactionList({ searchQuery, typeFilter }) {
  const { transactions, deleteTransaction } = useTransactionContext();
  const { role } = useAppContext();
  
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filtered = transactions.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 border-t-0">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  {role === "admin" && <th className="px-6 py-4 font-medium text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={role === "admin" ? 5 : 4} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors last:border-0">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(parseISO(t.date), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                        {t.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 font-medium ${t.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-slate-100'}`}>
                          {t.type === 'income' ? (
                            <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                          )}
                          ₹{t.amount.toLocaleString()}
                        </div>
                      </td>
                      {role === "admin" && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setEditingTransaction(t)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => deleteTransaction(t.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {editingTransaction && (
        <TransactionModal 
          transaction={editingTransaction} 
          onClose={() => setEditingTransaction(null)} 
        />
      )}
    </>
  );
}
