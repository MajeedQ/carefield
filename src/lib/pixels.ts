/**
 * Marketing pixel injection (browser-only).
 */

export interface MarketingPixelsInput {
  ga_id?: string;
  meta_pixel_id?: string;
  snap_pixel_id?: string;
  tiktok_pixel_id?: string;
}

let lastSig = "";

export function injectMarketingPixels(p: MarketingPixelsInput): void {
  if (typeof window === "undefined") return;
  const sig = JSON.stringify(p);
  if (sig === lastSig) return;
  lastSig = sig;

  const ids = ["ga-script", "ga-init-script", "meta-pixel", "snap-pixel", "tiktok-pixel"];
  ids.forEach((id) => document.getElementById(id)?.remove());

  if (p.ga_id) {
    const s1 = document.createElement("script");
    s1.id = "ga-script";
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${p.ga_id}`;
    document.head.appendChild(s1);
    const s2 = document.createElement("script");
    s2.id = "ga-init-script";
    s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${p.ga_id}');`;
    document.head.appendChild(s2);
  }
  if (p.meta_pixel_id) {
    const s = document.createElement("script");
    s.id = "meta-pixel";
    s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${p.meta_pixel_id}');fbq('track','PageView');`;
    document.head.appendChild(s);
  }
  if (p.snap_pixel_id) {
    const s = document.createElement("script");
    s.id = "snap-pixel";
    s.innerHTML = `(function(e,t,n){if(e.snaptr)return;var r=e.snaptr=function(){r.handleRequest?r.handleRequest.apply(r,arguments):r.queue.push(arguments)};r.queue=[];var a=t.createElement(n);a.async=!0;a.src="https://sc-static.net/sce/pixel/ps.js";var m=t.getElementsByTagName(n)[0];m.parentNode.insertBefore(a,m)})(window,document,"script");snaptr('init','${p.snap_pixel_id}');snaptr('track','PAGE_VIEW');`;
    document.head.appendChild(s);
  }
  if (p.tiktok_pixel_id) {
    const s = document.createElement("script");
    s.id = "tiktok-pixel";
    s.innerHTML = `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","aliasWithExtra","setAndPublish","set","send","import","onPle","onPlePure","setAndPublishPure"];ttq._i=ttq._i||{};ttq.init=function(e){var n=ttq._i[e]=ttq._i[e]||[];n.methods=ttq.methods;ttq.instances[e]=ttq.instances[e]||{methods:ttq.methods};var r=d.createElement("script");r.type="text/javascript";r.async=!0;r.src="https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid="+e;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)};ttq.load('${p.tiktok_pixel_id}');ttq.page();}(window,document,'ttq');`;
    document.head.appendChild(s);
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as any;
  try { w.gtag?.("event", name, params); } catch {}
  try { w.fbq?.("track", name, params); } catch {}
  try { w.snaptr?.("track", name.toUpperCase(), params); } catch {}
  try { w.ttq?.track?.(name, params); } catch {}
}
