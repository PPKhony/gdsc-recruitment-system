// app/layout.js or app/layout.tsx
"use client";

import { useEffect } from "react";
import { initGTM , logPageView } from "@/utils/GoogleTagManager/gtm";
import { usePathname } from 'next/navigation'; // Updated import for pathname

const RootLayout = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Log page view when pathname changes
    logPageView(pathname);

  }, [pathname]); // Dependency on pathname

  useEffect(() => {
    initGTM();
  }, []);

  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=GTM-WVNDBG29`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied'
              });
              gtag('config', 'GTM-WVNDBG29', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="root-layout">{children}</body>
    </html>
  );
};

export default RootLayout;
