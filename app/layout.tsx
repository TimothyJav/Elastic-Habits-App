import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elastic Habits",
  description: "ADHD-Friendly Habit Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
        <div className="max-w-4xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
