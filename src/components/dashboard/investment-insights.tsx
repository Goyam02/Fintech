"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { ChevronDown, TrendingUp, TrendingDown, BarChartHorizontalIcon, PieChartIcon } from "lucide-react";

const portfolioAllocation = [
  { name: "Stocks", value: 45, color: "#8b5cf6" },
  { name: "Bonds", value: 30, color: "#06b6d4" },
  { name: "Real Estate", value: 15, color: "#10b981" },
  { name: "Cash", value: 10, color: "#f59e0b" },
];

const portfolioPerformance = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 10200 },
  { name: "Mar", value: 10150 },
  { name: "Apr", value: 10300 },
  { name: "May", value: 10450 },
  { name: "Jun", value: 10650 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border shadow-sm rounded-md text-xs">
        <p className="font-medium">{`${label}: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export function InvestmentInsights() {
  return (
    <Card>
      <CardHeader className="bg-muted/50 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Investment Insights
            </CardTitle>
            <CardDescription>Portfolio allocation and performance</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <span>1Y View</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-6">
        <Tabs defaultValue="allocation">
          <TabsList className="grid grid-cols-2 mb-5">
            <TabsTrigger value="allocation" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Allocation</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChartHorizontalIcon className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="allocation">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie
                      data={portfolioAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {portfolioAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Allocation']}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background p-2 border shadow-sm rounded-md text-xs">
                              <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              <div className="space-y-4">
                <div className="space-y-3">
                  {portfolioAllocation.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: portfolioAllocation.findIndex(i => i.name === item.name) * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-sm font-medium">{item.value}%</div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Recommendation</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Rebalance
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Consider increasing bond allocation by 5% to reduce portfolio volatility.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Value</div>
                    <div className="text-2xl font-bold">$10,650</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">YTD Return</div>
                    <div className="flex items-center text-green-500 justify-end">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xl font-bold">+6.5%</span>
                    </div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={portfolioPerformance} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value/1000}k`}
                      domain={['dataMin - 500', 'dataMax + 500']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#8b5cf6", strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 1, stroke: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Best Performer</span>
                    <span className="font-medium">Tech ETF</span>
                    <span className="text-green-500 text-xs">+12.4%</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-muted-foreground">Worst Performer</span>
                    <span className="font-medium">Bond Fund</span>
                    <span className="text-red-500 text-xs">-2.1%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
