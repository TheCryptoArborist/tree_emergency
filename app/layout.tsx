import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Emergency Tree Board",
    template: "%s | Emergency Tree Board"
  },
  description:
    "Independent Gulf Coast tree-storm preparedness, safety guidance, and situational awareness.",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
