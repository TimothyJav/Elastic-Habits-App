import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Elastic Habits",
  description: "ADHD-Friendly Habit Tracker",
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
    <html lang="pl">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
        <div className="max-w-4xl mx-auto p-4 pb-20">{children}</div>
        
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur border-t border-slate-800">
          <div className="max-w-4xl mx-auto flex justify-around items-center py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center py-2 px-4 rounded-xl transition-all text-slate-400 hover:text-slate-200"
              >
                <span className="text-xl mb-1" role="img" aria-label={item.label}>
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