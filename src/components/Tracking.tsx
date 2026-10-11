import { COOKIEYES_ID, GA_ID } from "@/site";

/**
 * Consent first, then the banner, then Google Analytics.
 * Google Consent Mode v2: everything except security storage is denied until the visitor accepts in the
 * CookieYes banner (CookieYes updates the consent state when "Google Consent Mode" is on in its dashboard),
 * so GA sets no cookies before consent.
 */
const consentDefault = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', functionality_storage: 'denied', personalization_storage: 'denied',
  security_storage: 'granted', wait_for_update: 2000
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
`;

const gaConfig = `
gtag('js', new Date());
gtag('config', '${GA_ID}');
`;

export function Tracking() {
  return (
    <>
      <script id="consent-default" dangerouslySetInnerHTML={{ __html: consentDefault }} />
      {/* CookieYes must load synchronously, before anything that could set a cookie (vendor requirement). */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script id="cookieyes" type="text/javascript" src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script id="ga-config" dangerouslySetInnerHTML={{ __html: gaConfig }} />
    </>
  );
}
