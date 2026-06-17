import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import { AppToaster } from "@/components/AppToaster";

export const metadata: Metadata = {
  title: "Elastic Habits",
  description: "ADHD-Friendly Habit Tracker",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
};

const navItems = [
  { href: "/", label: "Start", icon: "🏠" },
  { href: "/dashboard", label: "Tablica", icon: "📊" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {/* Pages own their own max-width and horizontal padding. The wrapper only
            reserves space so the fixed bottom nav never covers page content,
            and respects the home-indicator safe area on notched phones. */}
        <div className="pb-[calc(5rem+env(safe-area-inset-bottom))]">{children}</div>
        <AppToaster />

        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-900/80 backdrop-blur pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto flex max-w-4xl items-center justify-around py-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-12 min-w-16 flex-col items-center justify-center rounded-xl px-4 py-2 text-slate-400 transition-all hover:text-slate-200 active:scale-95"
              >
                <span className="mb-0.5 text-xl" role="img" aria-label={item.label}>
                  {item.icon}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </body>
    </html>
  );
}
