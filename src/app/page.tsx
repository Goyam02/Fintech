import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FinancialHealthScore } from "@/components/dashboard/financial-health-score";
import { SpendingAnalysis } from "@/components/dashboard/spending-analysis";
import { InvestmentInsights } from "@/components/dashboard/investment-insights";
import { AiRecommendations } from "@/components/dashboard/ai-recommendations";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FinancialHealthScore />
            </div>
            <div>
              <AiRecommendations />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpendingAnalysis />
            <InvestmentInsights />
          </div>

          <div>
            <RecentTransactions />
          </div>
        </main>
      </div>
    </div>
  );
}
