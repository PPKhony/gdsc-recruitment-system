import GoogleAnalytics from "@/utils/GoogleAnalytic";
import Head from "next/head";
import { Suspense } from "react";
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-P2J3QPMVE4" />
      <body className="root-layout">{children}</body>
    </html>
  );
};

export default RootLayout;
