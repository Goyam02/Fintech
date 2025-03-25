"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  LightbulbIcon,
  SparklesIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ChevronRightIcon,
  PiggyBankIcon,
  TrendingUpIcon,
  CreditCardIcon
} from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Optimize credit card usage",
    description: "Switch to a cashback card for 3% higher returns on daily expenses",
    impact: "high",
    icon: CreditCardIcon,
    implemented: false,
  },
  {
    id: 2,
    title: "Increase retirement contribution",
    description: "Boost your 401(k) contribution by 2% to optimize tax benefits",
    impact: "medium",
    icon: PiggyBankIcon,
    implemented: false,
  },
  {
    id: 3,
    title: "Rebalance investment portfolio",
    description: "Adjust asset allocation to match your risk profile",
    impact: "high",
    icon: TrendingUpIcon,
    implemented: true,
  },
  {
    id: 4,
    title: "Consolidate high-interest debt",
    description: "Merge multiple high-interest loans to save $230/month",
    impact: "high",
    icon: CreditCardIcon,
    implemented: false,
  }
];

export function AiRecommendations() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="bg-muted/50 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <SparklesIcon className="h-5 w-5 text-primary" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Smart financial advice based on your data</CardDescription>
          </div>
          <Button variant="ghost" className="h-8 w-8 p-0" title="Refresh recommendations">
            <SparklesIcon className="h-4 w-4" />
            <span className="sr-only">Refresh recommendations</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-2">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-b last:border-b-0 p-4 ${recommendation.implemented ? 'bg-muted/50' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-1 rounded-full
                  ${recommendation.impact === 'high'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-orange-500/10 text-orange-500'}`}
                >
                  <recommendation.icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${recommendation.implemented ? 'text-muted-foreground line-through' : ''}`}>
                      {recommendation.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${recommendation.impact === 'high'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}
                    >
                      {recommendation.impact === 'high' ? 'High impact' : 'Medium impact'}
                    </Badge>
                  </div>

                  <p className={`text-sm ${recommendation.implemented ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                    {recommendation.description}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {recommendation.implemented ? (
                      <Badge variant="outline" className="text-xs font-normal bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle2Icon className="h-3 w-3 mr-1" />
                        Implemented
                      </Badge>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        Apply this suggestion
                        <ChevronRightIcon className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-3 bg-muted/30 flex justify-center">
          <Button variant="outline" className="w-full text-sm" size="sm">
            View all recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
