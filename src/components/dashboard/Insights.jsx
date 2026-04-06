import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Lightbulb } from "lucide-react";
import { useTransactionContext } from "../../context/TransactionContext";

export function Insights() {
  const { transactions } = useTransactionContext();

  const expenses = transactions.filter((t) => t.type === "expense");
  
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestSpender = Object.keys(categoryTotals).length > 0 
    ? Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b)
    : "None";

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  let observation = "You're doing great! Income is steady.";
  if (totalExpense > totalIncome) {
    observation = "Warning: Overall expenses exceed your income.";
  } else if (highestSpender !== "None") {
    observation = `Your biggest expense area is ${highestSpender}. Consider reviewing these costs.`;
  }

  return (
    <Card className="col-span-1 md:col-span-3 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <CardTitle className="text-base text-blue-800 dark:text-blue-300">Financial Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-slate-600 dark:text-slate-300">Highest Spending Category: <strong className="text-slate-900 dark:text-slate-100">{highestSpender}</strong></span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-slate-600 dark:text-slate-300">Observation: <strong className="text-slate-900 dark:text-slate-100">{observation}</strong></span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
