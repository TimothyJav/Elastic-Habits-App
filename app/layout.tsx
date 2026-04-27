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
      <body className="bg-white">{children}</body>
    </html>
  );
}
