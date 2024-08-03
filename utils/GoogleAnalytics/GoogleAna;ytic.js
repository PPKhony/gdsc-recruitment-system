// pages/_app.js or pages/_app.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initGA, logPageView } from "../lib/ga";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID); // Replace with your Tracking ID
      window.GA_INITIALIZED = true;
    }

    const handleRouteChange = (url) => {
      logPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
