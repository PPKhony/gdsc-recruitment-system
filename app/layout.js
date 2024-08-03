// app/layout.js or app/layout.tsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Updated import for pathname
import { initGA, logPageView } from '@/utils/GoogleAnalytics/ga'; // Import GA utility functions

const RootLayout = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID); // Initialize GA
      window.GA_INITIALIZED = true;
    }

    // Log page view when pathname changes
    logPageView(pathname);

  }, [pathname]); // Dependency on pathname

  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} // GA script
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied'
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
