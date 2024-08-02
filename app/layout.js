import GoogleAnalytics from "@/utils/GoogleAnalytic";
import Head from "next/head";
import { Suspense } from "react";
const RootLayout = ({ children }) => {
  return (
    <html>
      <body className="root-layout">
        <Suspense>
          <GoogleAnalytics GA_MEASUREMENT_ID="G-P2J3QPMVE4" />
          {children}
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
