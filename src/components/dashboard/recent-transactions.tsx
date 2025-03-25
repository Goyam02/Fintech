"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  SearchIcon,
  FilterIcon,
  ShoppingCartIcon,
  HomeIcon,
  CarIcon,
  CoffeeIcon,
  ShoppingBagIcon,
  DownloadIcon
} from "lucide-react";

const transactions = [
  {
    id: 1,
    name: "Amazon",
    description: "Online Shopping",
    date: "Today, 2:34 PM",
    amount: -129.99,
    type: "expense",
    category: "Shopping",
    icon: ShoppingCartIcon,
  },
  {
    id: 2,
    name: "Paycheck",
    description: "Salary Deposit",
    date: "Yesterday",
    amount: 3200.00,
    type: "income",
    category: "Income",
    icon: ArrowDownIcon,
  },
  {
    id: 3,
    name: "Starbucks",
    description: "Coffee Shop",
    date: "Yesterday",
    amount: -4.99,
    type: "expense",
    category: "Food & Drink",
    icon: CoffeeIcon,
  },
  {
    id: 4,
    name: "Mortgage",
    description: "Monthly Payment",
    date: "May 1, 2024",
    amount: -1200.00,
    type: "expense",
    category: "Housing",
    icon: HomeIcon,
  },
  {
    id: 5,
    name: "Uber",
    description: "Transportation",
    date: "Apr 30, 2024",
    amount: -24.50,
    type: "expense",
    category: "Transport",
    icon: CarIcon,
  },
  {
    id: 6,
    name: "Target",
    description: "Shopping",
    date: "Apr 28, 2024",
    amount: -65.43,
    type: "expense",
    category: "Shopping",
    icon: ShoppingBagIcon,
  }
];

export function RecentTransactions() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your recent financial activities</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full lg:w-auto pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <FilterIcon className="h-4 w-4" />
              <span className="sr-only">Filter transactions</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Download transactions</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="border-b px-4">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0 mb-[-1px]">
              <TabsTrigger
                value="all"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                Income
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                Expenses
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="divide-y">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full
                    ${transaction.type === 'income'
                      ? 'bg-green-500/10'
                      : transaction.category === 'Shopping'
                        ? 'bg-purple-500/10'
                        : transaction.category === 'Food & Drink'
                          ? 'bg-blue-500/10'
                          : transaction.category === 'Housing'
                            ? 'bg-orange-500/10'
                            : 'bg-primary/10'
                    }`}
                  >
                    <transaction.icon className={`h-5 w-5
                      ${transaction.type === 'income'
                        ? 'text-green-500'
                        : transaction.category === 'Shopping'
                          ? 'text-purple-500'
                          : transaction.category === 'Food & Drink'
                            ? 'text-blue-500'
                            : transaction.category === 'Housing'
                              ? 'text-orange-500'
                              : 'text-primary'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="font-medium">{transaction.name}</div>
                      <div className={`font-semibold tabular-nums ${transaction.type === 'income' ? 'text-green-500' : ''}`}>
                        {transaction.type === 'income' ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-muted-foreground">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 text-center">
              <Button variant="outline">View All Transactions</Button>
            </div>
          </TabsContent>

          <TabsContent value="income" className="mt-0">
            <div className="divide-y">
              {transactions.filter(t => t.type === 'income').map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <transaction.icon className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="font-medium">{transaction.name}</div>
                      <div className="font-semibold text-green-500 tabular-nums">
                        +{transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-muted-foreground">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {transactions.filter(t => t.type === 'income').length === 0 && (
              <div className="p-8 text-center text-muted-foreground">No income transactions found</div>
            )}
          </TabsContent>

          <TabsContent value="expenses" className="mt-0">
            <div className="divide-y">
              {transactions.filter(t => t.type === 'expense').map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full
                    ${transaction.category === 'Shopping'
                      ? 'bg-purple-500/10'
                      : transaction.category === 'Food & Drink'
                        ? 'bg-blue-500/10'
                        : transaction.category === 'Housing'
                          ? 'bg-orange-500/10'
                          : 'bg-primary/10'
                    }`}
                  >
                    <transaction.icon className={`h-5 w-5
                      ${transaction.category === 'Shopping'
                        ? 'text-purple-500'
                        : transaction.category === 'Food & Drink'
                          ? 'text-blue-500'
                          : transaction.category === 'Housing'
                            ? 'text-orange-500'
                            : 'text-primary'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="font-medium">{transaction.name}</div>
                      <div className="font-semibold tabular-nums">
                        {transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-muted-foreground">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {transactions.filter(t => t.type === 'expense').length === 0 && (
              <div className="p-8 text-center text-muted-foreground">No expense transactions found</div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
