import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { useTransactionContext } from "../../context/TransactionContext";

export function SummaryCards() {
  const { transactions } = useTransactionContext();
  
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
            Overall available funds
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <div className="h-4 w-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">+₹{income.toLocaleString()}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Total historical income
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <div className="h-4 w-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <ArrowDownRight className="h-3 w-3 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">-₹{expenses.toLocaleString()}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Total historical spending
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
