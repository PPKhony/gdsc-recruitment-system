import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
// import BootstrapClient from "@/utils/bootstrapclient";
import { Analytics } from "@vercel/analytics/react";
import "@/utils/styles.css";
import "@/utils/custom.scss";
export const metadata: Metadata = {
  title: "GDSC Internal",
  description: "GDSC Internal",
  icons: {
    icon: "/image/Google_for_Developers_logomark_color.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        {children}
        {/* <BootstrapClient /> */}
      </body>
    </html>
  );
}
