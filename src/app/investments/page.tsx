"use client";
import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ChevronDown, Plus, Clock, MoreHorizontal, DollarSign, PieChart as PieChartIcon, BarChart3, LineChart as LineChartIcon } from "lucide-react";
import { InvestmentInsights } from "@/components/dashboard/investment-insights";

const portfolioData = [
  { name: "US Stocks", value: 42500, color: "#8b5cf6", change: 5.2 },
  { name: "International", value: 25000, color: "#06b6d4", change: -2.1 },
  { name: "Bonds", value: 18000, color: "#10b981", change: 1.8 },
  { name: "Real Estate", value: 12000, color: "#f59e0b", change: 3.5 },
  { name: "Crypto", value: 8500, color: "#f43f5e", change: -4.3 },
  { name: "Cash", value: 14000, color: "#6b7280", change: 0.1 },
];

const historicalPerformance = [
  { month: "Jan", value: 112000 },
  { month: "Feb", value: 115000 },
  { month: "Mar", value: 113500 },
  { month: "Apr", value: 118000 },
  { month: "May", value: 117000 },
  { month: "Jun", value: 120000 },
];

const topHoldings = [
  { name: "AAPL", fullName: "Apple Inc.", value: 15200, shares: 85, price: 178.82, change: 0.85 },
  { name: "MSFT", fullName: "Microsoft Corp.", value: 12800, shares: 32, price: 400.10, change: 1.25 },
  { name: "AMZN", fullName: "Amazon.com Inc.", value: 9500, shares: 65, price: 146.15, change: -0.34 },
  { name: "GOOGL", fullName: "Alphabet Inc.", value: 8750, shares: 55, price: 159.10, change: 0.52 },
  { name: "BRK.B", fullName: "Berkshire Hathaway", value: 7600, shares: 18, price: 422.22, change: 0.21 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex justify-between gap-4 text-sm">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-medium">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function InvestmentsPage() {
  const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <main className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-3xl font-bold">Investments</h1>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Clock className="h-4 w-4" />
                <span>YTD</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ChevronDown className="h-4 w-4" />
                <span>All Accounts</span>
              </Button>
              <Button variant="default" size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Investment</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Portfolio Value</CardDescription>
                <CardTitle className="text-2xl">${totalPortfolioValue.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  2.3% ($2,720) up this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>YTD Return</CardDescription>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">+7.14%</CardTitle>
                  <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none">
                    Outperforming S&P 500
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  +$8,000 in absolute returns
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Asset Allocation</CardDescription>
                <CardTitle className="text-2xl">6 Asset Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6] mr-1"></span>
                  US Stocks dominate with 35.4%
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>6-month historical performance</CardDescription>
                  </div>
                  <Tabs defaultValue="line">
                    <TabsList className="h-8">
                      <TabsTrigger value="line" className="h-8 w-8 p-0">
                        <LineChartIcon className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="area" className="h-8 w-8 p-0">
                        <BarChart3 className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="line" className="h-[300px]">
                  <TabsContent value="line" className="mt-0 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={historicalPerformance}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis domain={['dataMin - 5000', 'dataMax + 5000']} tickFormatter={(value) => `$${value/1000}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8b5cf6"
                          name="Portfolio Value"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="area" className="mt-0 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={historicalPerformance}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis domain={['dataMin - 5000', 'dataMax + 5000']} tickFormatter={(value) => `$${value/1000}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#8b5cf6"
                          fill="url(#colorValue)"
                          name="Portfolio Value"
                        />
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t px-6 py-3 bg-muted/20">
                <div className="flex items-center text-sm gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Up days: 35</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span>Down days: 22</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span>Best day: +2.4%</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                    <span>Worst day: -1.8%</span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  Asset Allocation
                </CardTitle>
                <CardDescription>Current distribution of assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background p-2 border shadow-sm rounded-md text-xs">
                                <p className="font-medium">{payload[0].name}</p>
                                <p>${Number(payload[0].value).toLocaleString()}</p>
                                <p>{((Number(payload[0].value) / totalPortfolioValue) * 100).toFixed(1)}% of portfolio</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                  {portfolioData.map((asset) => (
                    <div key={asset.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                        <span className="text-sm font-medium">{asset.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{((asset.value / totalPortfolioValue) * 100).toFixed(1)}%</div>
                        <div className="flex items-center text-xs">
                          {asset.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                          )}
                          <span className={asset.change > 0 ? "text-green-500" : "text-red-500"}>
                            {asset.change > 0 ? "+" : ""}{asset.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Top Holdings
                  </CardTitle>
                  <CardDescription>Your best performing investments</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium p-3 text-sm">Symbol</th>
                      <th className="text-left font-medium p-3 text-sm">Name</th>
                      <th className="text-right font-medium p-3 text-sm">Shares</th>
                      <th className="text-right font-medium p-3 text-sm">Price</th>
                      <th className="text-right font-medium p-3 text-sm">Value</th>
                      <th className="text-right font-medium p-3 text-sm">24h Change</th>
                      <th className="text-right font-medium p-3 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topHoldings.map((holding) => (
                      <tr key={holding.name} className="border-b">
                        <td className="p-3 text-sm font-medium">{holding.name}</td>
                        <td className="p-3 text-sm text-muted-foreground">{holding.fullName}</td>
                        <td className="p-3 text-sm text-right">{holding.shares}</td>
                        <td className="p-3 text-sm text-right">${holding.price}</td>
                        <td className="p-3 text-sm text-right font-medium">${holding.value.toLocaleString()}</td>
                        <td className={`p-3 text-sm text-right ${holding.change > 0 ? "text-green-500" : "text-red-500"}`}>
                          {holding.change > 0 ? "+" : ""}{holding.change}%
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            <InvestmentInsights />
          </div>
        </main>
      </div>
    </div>
  );
}
