import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpendingAnalysis } from "@/components/dashboard/spending-analysis";
import { CreditCard, Clock, TrendingDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpendingPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <main className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-3xl font-bold">Spending</h1>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Clock className="h-4 w-4" />
                <span>Last 30 days</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Spending</CardDescription>
                <CardTitle className="text-2xl">$3,456.78</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                  5.2% less than last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Highest Category</CardDescription>
                <CardTitle className="text-2xl">Housing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  $1,450.00 (42% of total)
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Transactions</CardDescription>
                <CardTitle className="text-2xl">42</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  12 recurring payments
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Daily</CardDescription>
                <CardTitle className="text-2xl">$115.23</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                  $5.40 less than last month
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpendingAnalysis />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Top Merchants
                </CardTitle>
                <CardDescription>Where you spend the most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Amazon", amount: 320.45, percentage: 75 },
                    { name: "Costco", amount: 255.12, percentage: 60 },
                    { name: "Target", amount: 180.98, percentage: 45 },
                    { name: "Starbucks", amount: 95.32, percentage: 25 },
                    { name: "Uber", amount: 85.65, percentage: 20 },
                  ].map((merchant) => (
                    <div key={merchant.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{merchant.name}</span>
                        <span className="text-sm">${merchant.amount}</span>
                      </div>
                      <div className="h-2 bg-muted rounded overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${merchant.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
