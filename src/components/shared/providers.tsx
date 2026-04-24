"use client"; // Bu çok kritik, çünkü tarayıcı (Browser) özelliklerini kullanacağız.

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
