import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Analytics } from "@vercel/analytics/react"
import "@/utils/custom.scss"
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
