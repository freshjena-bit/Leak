import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal File Share",
  description: "Share legal files with Supabase"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
