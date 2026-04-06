import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTransactionContext } from "../../context/TransactionContext";
import { parseISO, format, isValid } from "date-fns";

export function BalanceChart() {
  const { transactions } = useTransactionContext();

  const sorted = [...transactions]
    .filter(t => t.date && isValid(parseISO(t.date)))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let currentBalance = 0;
  const data = sorted.map((t) => {
    if (t.type === "income") {
      currentBalance += t.amount;
    } else {
      currentBalance -= t.amount;
    }
    return {
      date: format(parseISO(t.date), "MMM dd"),
      balance: currentBalance,
    };
  });

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Balance Trend</CardTitle>
        <CardDescription>Your balance over time</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${value}`} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', color: '#0f172a' }}
                itemStyle={{ color: '#2563eb' }}
              />
              <Area type="monotone" dataKey="balance" stroke="#2563eb" fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
