import TagManager from 'react-gtm-module';

export const initGTM = () => {
  TagManager.initialize({ gtmId: 'GTM-KG6C5N9T' });
};

export const setConsentMode = (analyticsStorage, adStorage) => {
  console.log(analyticsStorage);
  window.dataLayer = window.dataLayer || [];
  window.gtag('consent', 'update', {
    analytics_storage: analyticsStorage,
    ad_storage: adStorage,
  });
};