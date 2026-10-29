import Script from "next/script";

const GA_ID = "G-JGJF1GXXRE";

// Google Analytics 4. Page views on client-side navigation are tracked automatically
// by GA4's enhanced measurement (history changes).
export default function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
