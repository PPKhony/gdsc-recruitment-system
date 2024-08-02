import GoogleAnalytics from "@/utils/GoogleAnalytic";
import Head from "next/head";
const RootLayout = ({ children }) => {
  return (
    <html>
      <Head>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-P2J3QPMVE4" />
      </Head>
      <body className="root-layout">{children}</body>
    </html>
  );
};

export default RootLayout;
