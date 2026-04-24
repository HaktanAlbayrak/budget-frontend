"use client";

import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useUIStore } from "@/store/use-ui-store";
import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
  footerText: string;
};

export function DashboardShell({ children, footerText }: DashboardShellProps) {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div
        className={`flex min-h-screen min-w-0 flex-col transition-[padding] duration-200 ${
          isSidebarOpen ? "md:pl-56" : "md:pl-20"
        }`}
      >
        <Header />
        <main className="flex flex-1 flex-col p-6">
          <div className="flex-1">{children}</div>
          <footer className="mt-8 border-t border-glass-border bg-glass/40 px-6 py-4 text-center text-sm text-foreground/70 backdrop-blur-md">
            {footerText}
          </footer>
        </main>
      </div>
    </div>
  );
}
