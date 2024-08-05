// app/layout.js or app/layout.tsx
"use client";

import { useEffect } from 'react';
import { initGTM } from '@/utils/GoogleTagManager/gtm';

const RootLayout = ({ children }) => {
  
  useEffect(() => {
    initGTM();
  }, []);
 

  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=GTM-KG6C5N9T`} // GA script
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
            `,
          }}
        />
      </head>
      <body className="root-layout">{children}</body>
    </html>
  );
};

export default RootLayout;
