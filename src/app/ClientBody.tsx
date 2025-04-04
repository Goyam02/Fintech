"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export function ClientBody({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
