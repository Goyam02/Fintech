"use client";

import { CircularProgress } from "@/components/ui/custom/circular-progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const scoreFactors = [
  {
    name: "Debt-to-Income",
    score: 72,
    status: "good",
    description: "Your debt-to-income ratio is healthy",
    trend: "up",
    trendValue: "3% better than last month"
  },
  {
    name: "Credit Utilization",
    score: 85,
    status: "excellent",
    description: "Your credit utilization is excellent",
    trend: "up",
    trendValue: "5% better than last month"
  },
  {
    name: "Payment History",
    score: 93,
    status: "excellent",
    description: "You have consistent payment history",
    trend: "stable",
    trendValue: "Unchanged from last month"
  },
  {
    name: "Savings Rate",
    score: 62,
    status: "fair",
    description: "Your savings rate could be improved",
    trend: "down",
    trendValue: "2% worse than last month"
  },
  {
    name: "Investment Diversity",
    score: 78,
    status: "good",
    description: "Your investments are reasonably diverse",
    trend: "up",
    trendValue: "4% better than last month"
  }
];

export function FinancialHealthScore() {
  const overallScore = 84;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Financial Health Score</CardTitle>
            <CardDescription>AI-generated comprehensive analysis of your financial health</CardDescription>
          </div>
          <Badge variant="outline" className="font-medium" style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)', color: '#9333ea' }}>
            Updated Today
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="factors">Factors</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 flex flex-col items-center justify-center">
                <CircularProgress
                  value={overallScore}
                  size={200}
                  strokeWidth={16}
                  valueFormatter={(value) => `${value}`}
                  textClassName="text-4xl pb-1"
                  gradientStart="#9333ea"
                  gradientEnd="#4f46e5"
                />
                <div className="text-center mt-4">
                  <Badge
                    className="px-3 py-1 text-sm font-medium"
                    style={{
                      backgroundColor: overallScore >= 80 ? 'rgba(34, 197, 94, 0.1)' :
                                      overallScore >= 65 ? 'rgba(234, 179, 8, 0.1)' :
                                      'rgba(239, 68, 68, 0.1)',
                      color: overallScore >= 80 ? 'rgb(34, 197, 94)' :
                            overallScore >= 65 ? 'rgb(234, 179, 8)' :
                            'rgb(239, 68, 68)'
                    }}
                  >
                    {overallScore >= 80 ? 'Excellent' :
                     overallScore >= 65 ? 'Good' :
                     overallScore >= 50 ? 'Fair' :
                     'Needs Attention'}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    <TrendingUp className="inline h-4 w-4 text-green-500 mr-1" />
                    <span>+3 points from last month</span>
                  </p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-4">
                <motion.div
                  className="bg-primary/5 rounded-lg p-4 border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/20 p-1.5 rounded-full">
                      <InfoIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Assessment</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your financial health is excellent. You've made significant improvements to your
                        debt-to-income ratio and have maintained an excellent payment history. Consider
                        increasing your savings rate to further improve your score.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {scoreFactors.slice(0, 4).map((factor, index) => (
                    <motion.div
                      key={factor.name}
                      className="rounded-lg border p-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">{factor.name}</h4>
                        <span className="text-sm font-semibold">{factor.score}</span>
                      </div>
                      <Progress
                        value={factor.score}
                        className="h-2 mt-2"
                        style={{
                          background: 'rgba(148, 163, 184, 0.2)',
                          '& > div': {
                            backgroundColor: factor.score >= 80 ? '#22c55e' :
                                          factor.score >= 65 ? '#eab308' :
                                          '#ef4444'
                          }
                        }}
                      />
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        {factor.trend === 'up' && <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />}
                        {factor.trend === 'down' && <TrendingDown className="inline h-3 w-3 text-red-500 mr-1" />}
                        {factor.trend === 'stable' && <span className="inline-block h-3 w-3 mr-1">↔</span>}
                        <span>{factor.trendValue}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="factors">
            <div className="space-y-4">
              {scoreFactors.map((factor, index) => (
                <motion.div
                  key={factor.name}
                  className="rounded-lg border p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{factor.name}</h4>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{factor.score}</div>
                      <Badge
                        className="mt-1"
                        style={{
                          backgroundColor: factor.score >= 80 ? 'rgba(34, 197, 94, 0.1)' :
                                         factor.score >= 65 ? 'rgba(234, 179, 8, 0.1)' :
                                         'rgba(239, 68, 68, 0.1)',
                          color: factor.score >= 80 ? 'rgb(34, 197, 94)' :
                                 factor.score >= 65 ? 'rgb(234, 179, 8)' :
                                 'rgb(239, 68, 68)'
                        }}
                      >
                        {factor.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={factor.score}
                    className="h-2 mt-3"
                  />
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    {factor.trend === 'up' && <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />}
                    {factor.trend === 'down' && <TrendingDown className="inline h-3 w-3 text-red-500 mr-1" />}
                    {factor.trend === 'stable' && <span className="inline-block h-3 w-3 mr-1">↔</span>}
                    <span>{factor.trendValue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <AlertCircle className="h-5 w-5 mr-2" />
              Historical data visualization will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
