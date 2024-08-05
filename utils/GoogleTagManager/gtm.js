import TagManager from 'react-gtm-module';

export const initGTM = () => {
  TagManager.initialize({ gtmId: 'GTM-WVNDBG29' });
};

export const setConsentMode = (analyticsStorage, adStorage) => {
  console.log(analyticsStorage);
  window.dataLayer = window.dataLayer || [];
  window.gtag('consent', 'update', {
    analytics_storage: analyticsStorage,
    ad_storage: adStorage,
  });
};