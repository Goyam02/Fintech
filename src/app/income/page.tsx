"use client";

import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, TrendingUp, Banknote, DollarSign } from "lucide-react";

const monthlyIncomeData = [
  { month: "Jan", salary: 3800, investments: 350, sideHustle: 600 },
  { month: "Feb", salary: 3800, investments: 320, sideHustle: 550 },
  { month: "Mar", salary: 3800, investments: 380, sideHustle: 700 },
  { month: "Apr", salary: 4200, investments: 400, sideHustle: 650 },
  { month: "May", salary: 4200, investments: 450, sideHustle: 800 },
  { month: "Jun", salary: 4200, investments: 470, sideHustle: 850 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex justify-between gap-4 text-sm">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-medium">${entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function IncomePage() {
  const currentMonthTotal = monthlyIncomeData[monthlyIncomeData.length - 1].salary +
    monthlyIncomeData[monthlyIncomeData.length - 1].investments +
    monthlyIncomeData[monthlyIncomeData.length - 1].sideHustle;

  const previousMonthTotal = monthlyIncomeData[monthlyIncomeData.length - 2].salary +
    monthlyIncomeData[monthlyIncomeData.length - 2].investments +
    monthlyIncomeData[monthlyIncomeData.length - 2].sideHustle;

  const percentChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <main className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-3xl font-bold">Income</h1>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Calendar className="h-4 w-4" />
                <span>2024</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Monthly Income</CardDescription>
                <CardTitle className="text-2xl">${currentMonthTotal.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  {percentChange.toFixed(1)}% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>YTD Income</CardDescription>
                <CardTitle className="text-2xl">$32,450.00</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  42% of yearly goal
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Income Sources</CardDescription>
                <CardTitle className="text-2xl">3 Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Salary, Investments, Side Hustle
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Breakdown</CardTitle>
                <CardDescription>See your income sources and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="trends">
                  <TabsList className="mb-6">
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="sources">Sources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="trends">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={monthlyIncomeData}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="salary"
                            stroke="#8b5cf6"
                            name="Salary"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="investments"
                            stroke="#06b6d4"
                            name="Investments"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="sideHustle"
                            stroke="#f59e0b"
                            name="Side Hustle"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="sources">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlyIncomeData}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(value) => `$${value}`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="salary" name="Salary" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="investments" name="Investments" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="sideHustle" name="Side Hustle" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Recent Income
                  </CardTitle>
                  <CardDescription>Latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "ABC Company", date: "June 15, 2024", amount: 4200, category: "Salary" },
                      { source: "Vanguard ETF", date: "June 10, 2024", amount: 470, category: "Investments" },
                      { source: "Freelance Project", date: "June 8, 2024", amount: 850, category: "Side Hustle" },
                      { source: "Airbnb Rental", date: "June 5, 2024", amount: 320, category: "Side Hustle" },
                    ].map((income, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium">{income.source}</div>
                          <div className="text-sm text-muted-foreground">{income.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-500">+${income.amount}</div>
                          <div className="text-xs text-muted-foreground">{income.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-primary" />
                    Income Split
                  </CardTitle>
                  <CardDescription>This month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { name: "Salary", amount: 4200, percentage: 78, color: "#8b5cf6" },
                      { name: "Investments", amount: 470, percentage: 9, color: "#06b6d4" },
                      { name: "Side Hustle", amount: 850, percentage: 13, color: "#f59e0b" },
                    ].map((source) => (
                      <div key={source.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{source.name}</span>
                          <span className="text-sm">${source.amount}</span>
                        </div>
                        <div className="h-2 bg-muted rounded overflow-hidden">
                          <div
                            className="h-full"
                            style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {source.percentage}% of total
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
