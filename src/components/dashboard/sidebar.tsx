"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useUIStore } from "@/store/use-ui-store";
import {
  IconCalendarStats,
  IconCategory,
  IconLayoutDashboard,
  IconReceipt,
  IconTags,
  IconTarget,
  IconWallet,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, type ComponentType } from "react";

type SidebarItem = {
  key:
    | "overview"
    | "accounts"
    | "categories"
    | "transactions"
    | "plannedPayments"
    | "goals"
    | "tags";
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { key: "overview", href: "/dashboard", icon: IconLayoutDashboard },
  { key: "accounts", href: "/dashboard/accounts", icon: IconWallet },
  { key: "categories", href: "/dashboard/categories", icon: IconCategory },
  { key: "transactions", href: "/dashboard/transactions", icon: IconReceipt },
  {
    key: "plannedPayments",
    href: "/dashboard/planned-payments",
    icon: IconCalendarStats,
  },
  { key: "goals", href: "/dashboard/goals", icon: IconTarget },
  { key: "tags", href: "/dashboard/tags", icon: IconTags },
];

export function Sidebar() {
  const t = useTranslations("dashboard.sidebar");
  const pathname = usePathname();
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const isOverviewActive = pathname === "/dashboard";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const syncViewport = (event: MediaQueryList | MediaQueryListEvent) => {
      const isMobile = event.matches;
      setIsMobileViewport(isMobile);

      if (isMobile) {
        setSidebarOpen(false);
      }
    };

    syncViewport(mediaQuery);

    const onChange = (event: MediaQueryListEvent) => {
      syncViewport(event);
    };

    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, [setSidebarOpen]);

  useEffect(() => {
    if (!(isMobileViewport && isSidebarOpen)) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileViewport, isSidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (!(isMobileViewport && isSidebarOpen)) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileViewport, isSidebarOpen]);

  const menuItems = SIDEBAR_ITEMS.map((item) => {
    const isActive =
      item.href === "/dashboard"
        ? isOverviewActive
        : pathname.startsWith(item.href);

    return {
      ...item,
      isActive,
    };
  });

  return (
    <>
      {isMobileViewport && isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 overflow-hidden border-r border-glass-border bg-glass/60 backdrop-blur-md transition-[width,transform] duration-200 ${
          isMobileViewport ? "w-64" : isSidebarOpen ? "w-56" : "w-20"
        } ${
          isMobileViewport && !isSidebarOpen
            ? "-translate-x-full"
            : "translate-x-0"
        }`}
        aria-label="Dashboard sidebar"
      >
        <div className="flex h-full flex-col p-3">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => {
                    if (isMobileViewport) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`group relative flex items-center rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                    item.isActive
                      ? "bg-glass border border-glass-border text-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/8"
                  }`}
                  aria-current={item.isActive ? "page" : undefined}
                  title={t(item.key)}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {isMobileViewport || isSidebarOpen ? (
                    <span className="ml-3 whitespace-nowrap">
                      {t(item.key)}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
