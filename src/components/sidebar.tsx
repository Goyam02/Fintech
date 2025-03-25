"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Banknote,
  CreditCard,
  Settings,
  User,
  PieChart,
  TrendingUp,
  HelpCircle,
  BellRing
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

const navItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    href: "/",
  },
  {
    title: "Spending",
    icon: CreditCard,
    href: "/spending",
  },
  {
    title: "Income",
    icon: Banknote,
    href: "/income",
  },
  {
    title: "Investments",
    icon: TrendingUp,
    href: "/investments",
  },
  {
    title: "Budget",
    icon: PieChart,
    href: "/budget",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 border-r h-screen bg-background overflow-y-auto">
      <div className="flex items-center h-16 px-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-xl">FinScope</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-4 space-y-1">
        <p className="text-xs font-medium text-muted-foreground mb-4 px-2">MENU</p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
            <BellRing className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Johnson</p>
            <p className="text-xs text-muted-foreground truncate">alex@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
