import { SummaryCards } from "../components/dashboard/SummaryCards";
import { BalanceChart } from "../components/dashboard/BalanceChart";
import { SpendingBreakdown } from "../components/dashboard/SpendingBreakdown";
import { Insights } from "../components/dashboard/Insights";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
      </div>
      <SummaryCards />
      <div className="grid gap-4 md:grid-cols-3">
        <BalanceChart />
        <SpendingBreakdown />
      </div>
      <div className="grid gap-4">
        <Insights />
      </div>
    </div>
  );
}
