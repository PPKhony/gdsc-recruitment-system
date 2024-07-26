import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
// import BootstrapClient from "@/utils/bootstrapclient";
import { Analytics } from "@vercel/analytics/react";
import "@/utils/styles.css";
import "@/utils/custom.scss";
import HomepageHeader from "@/components/HomepageHeader";
export const metadata: Metadata = {
  title: "GDSC Internal",
  description: "GDSC Internal",
  icons: {
    icon: "imagesTU-GDSC Logo chapter lockup template.png",
  },
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
        <HomepageHeader/>
        {children}
        {/* <BootstrapClient /> */}
      </body>
    </html>
  );
}
