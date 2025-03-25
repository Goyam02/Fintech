"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, DollarSign, TrendingDown, TrendingUp, BarChart4, PieChart } from "lucide-react";
import { ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";

const spendingByCategory = [
  { name: "Housing", value: 1200, color: "#8b5cf6" },
  { name: "Food", value: 650, color: "#06b6d4" },
  { name: "Transport", value: 450, color: "#f43f5e" },
  { name: "Entertainment", value: 380, color: "#10b981" },
  { name: "Shopping", value: 300, color: "#f59e0b" },
  { name: "Other", value: 250, color: "#6b7280" },
];

const monthlySpending = [
  { name: "Jan", value: 2800 },
  { name: "Feb", value: 3100 },
  { name: "Mar", value: 2950 },
  { name: "Apr", value: 3200 },
  { name: "May", value: 3450 },
  { name: "Jun", value: 3230 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border shadow-sm rounded-md text-xs">
        <p className="font-medium">{`${payload[0].name}: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export function SpendingAnalysis() {
  return (
    <Card>
      <CardHeader className="bg-muted/50 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Spending Analysis
            </CardTitle>
            <CardDescription>Your spending patterns and trends</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <span>This Month</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-2 mb-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex flex-col items-center py-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-5"
              >
                <ResponsiveContainer width={240} height={240}>
                  <RechartPieChart>
                    <Pie
                      data={spendingByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {spendingByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartPieChart>
                </ResponsiveContainer>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Monthly Total</div>
                  <div className="text-2xl font-bold">$3,230</div>
                  <div className="flex items-center text-xs text-red-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>8.5% vs last month</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Top Category</div>
                  <div className="text-2xl font-bold">Housing</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>37% of spending</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Top Categories</h4>
              <div className="space-y-3">
                {spendingByCategory.slice(0, 3).map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="text-sm font-medium">${category.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlySpending} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="value"
                    radius={[4, 4, 0, 0]}
                    background={{ fill: "#f3f4f6", opacity: 0.2, radius: [4, 4, 0, 0] }}
                  >
                    {monthlySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#8b5cf6" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Monthly spending</span>
              </div>
              <Badge variant="outline" className="text-xs px-2 py-0 h-6">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                <span>15.3% YTD</span>
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
