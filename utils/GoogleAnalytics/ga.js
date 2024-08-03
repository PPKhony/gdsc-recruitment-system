import ReactGA from "react-ga4";

export const initGA = (trackingId) => {
  ReactGA.initialize(trackingId);
};

export const logPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const setConsentMode = (analyticsStorage, adStorage) => {
  console.log(analyticsStorage);
  window.gtag('consent', 'update', {
    analytics_storage: analyticsStorage,
    ad_storage: adStorage,
  });
};