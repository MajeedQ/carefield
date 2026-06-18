/**
 * Marketing pixel injection (browser-only) with debug logging.
 *
 * Enable verbose logging by either:
 *   - setting localStorage.setItem('pixels_debug', '1')
 *   - or appending ?pixel_debug=1 to any URL
 *
 * Logs are prefixed with [Pixels] and show: which pixels were detected/loaded,
 * each tracked event, and per-platform delivery status (sent / not-loaded / error).
 */

export interface MarketingPixelsInput {
  ga_id?: string;
  meta_pixel_id?: string;
  snap_pixel_id?: string;
  tiktok_pixel_id?: string;
}

let lastSig = "";
let lastPath = "";

const validators = {
  ga_id: /^G-[A-Z0-9]{4,20}$/,
  meta_pixel_id: /^[0-9]{8,20}$/,
  snap_pixel_id: /^[a-f0-9-]{36}$/i,
  tiktok_pixel_id: /^[A-Z0-9]{18,24}$/,
};

function safe(value: string | undefined, re: RegExp): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  return re.test(v) ? v : undefined;
}

function isDebug(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage?.getItem("pixels_debug") === "1") return true;
    if (new URLSearchParams(window.location.search).get("pixel_debug") === "1") return true;
  } catch {}
  return false;
}

function log(...args: unknown[]) {
  if (isDebug()) console.log("%c[Pixels]", "color:#0a7;font-weight:bold", ...args);
}
function warn(...args: unknown[]) {
  if (isDebug()) console.warn("[Pixels]", ...args);
}

/** Poll briefly for a global to confirm a pixel SDK actually loaded. */
function waitFor(name: string, timeoutMs = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    const w = window as any;
    const start = Date.now();
    const tick = () => {
      if (w[name]) return resolve(true);
      if (Date.now() - start > timeoutMs) return resolve(false);
      setTimeout(tick, 100);
    };
    tick();
  });
}

export function injectMarketingPixels(p: MarketingPixelsInput): void {
  if (typeof window === "undefined") return;

  const ga = safe(p.ga_id, validators.ga_id);
  const meta = safe(p.meta_pixel_id, validators.meta_pixel_id);
  const snap = safe(p.snap_pixel_id, validators.snap_pixel_id);
  const tiktok = safe(p.tiktok_pixel_id, validators.tiktok_pixel_id);

  log("inject() called with detected/valid IDs:", { ga, meta, snap, tiktok });
  Object.entries(p).forEach(([k, v]) => {
    const validated = { ga_id: ga, meta_pixel_id: meta, snap_pixel_id: snap, tiktok_pixel_id: tiktok }[k as keyof MarketingPixelsInput];
    if (v && !validated) warn(`${k}="${v}" rejected — does not match expected format`);
  });

  const sig = JSON.stringify({ ga, meta, snap, tiktok });
  if (sig === lastSig) {
    log("inject() skipped (no change in IDs)");
    return;
  }
  lastSig = sig;

  ["ga-script", "ga-init-script", "meta-pixel", "snap-pixel", "tiktok-pixel"].forEach((id) =>
    document.getElementById(id)?.remove(),
  );

  if (ga) {
    const s1 = document.createElement("script");
    s1.id = "ga-script";
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`;
    document.head.appendChild(s1);
    const s2 = document.createElement("script");
    s2.id = "ga-init-script";
    s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{debug_mode:${isDebug()}});`;
    document.head.appendChild(s2);
    waitFor("gtag").then((ok) => log(`Google Analytics (${ga}) loaded:`, ok));
  }
  if (meta) {
    const s = document.createElement("script");
    s.id = "meta-pixel";
    s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`;
    document.head.appendChild(s);
    waitFor("fbq").then((ok) => log(`Meta Pixel (${meta}) loaded:`, ok, "→ PageView fired"));
  }
  if (snap) {
    const s = document.createElement("script");
    s.id = "snap-pixel";
    s.innerHTML = `(function(e,t,n){if(e.snaptr)return;var r=e.snaptr=function(){r.handleRequest?r.handleRequest.apply(r,arguments):r.queue.push(arguments)};r.queue=[];var a=t.createElement(n);a.async=!0;a.src="https://sc-static.net/scevent.min.js";var m=t.getElementsByTagName(n)[0];m.parentNode.insertBefore(a,m)})(window,document,"script");snaptr('init','${snap}');snaptr('track','PAGE_VIEW');`;
    document.head.appendChild(s);
    waitFor("snaptr").then((ok) => log(`Snapchat Pixel (${snap}) loaded:`, ok, "→ PAGE_VIEW fired"));
  }
  if (tiktok) {
    const s = document.createElement("script");
    s.id = "tiktok-pixel";
    s.innerHTML = `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${tiktok}');${isDebug() ? "ttq.debug && ttq.debug();" : ""}ttq.page();}(window,document,'ttq');`;
    document.head.appendChild(s);
    waitFor("ttq").then((ok) => log(`TikTok Pixel (${tiktok}) loaded:`, ok, "→ page fired"));
  }

  // Re-fire PageView on SPA route changes
  installRouteChangeTracker();
}

function installRouteChangeTracker() {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.__pixelsRouteTrackerInstalled) return;
  w.__pixelsRouteTrackerInstalled = true;

  const fire = () => {
    const path = window.location.pathname + window.location.search;
    if (path === lastPath) return;
    lastPath = path;
    log("Route change → PageView:", path);
    try { w.gtag?.("event", "page_view", { page_path: path }); } catch (e) { warn("gtag page_view error", e); }
    try { w.fbq?.("track", "PageView"); } catch (e) { warn("fbq PageView error", e); }
    try { w.snaptr?.("track", "PAGE_VIEW"); } catch (e) { warn("snaptr PAGE_VIEW error", e); }
    try { w.ttq?.page?.(); } catch (e) { warn("ttq page error", e); }
  };

  const origPush = history.pushState;
  const origReplace = history.replaceState;
  history.pushState = function (...args: any[]) { const r = origPush.apply(this, args as any); fire(); return r; };
  history.replaceState = function (...args: any[]) { const r = origReplace.apply(this, args as any); fire(); return r; };
  window.addEventListener("popstate", fire);
  lastPath = window.location.pathname + window.location.search;
}

/** Map a generic event name to each platform's preferred standard event. */
function mapEvent(name: string): { meta: string; snap: string; tiktok: string } {
  const n = name.toLowerCase();
  if (n === "lead" || n === "submitapplication") {
    return { meta: "Lead", snap: "SIGN_UP", tiktok: "SubmitForm" };
  }
  if (n === "completeregistration") {
    return { meta: "CompleteRegistration", snap: "SIGN_UP", tiktok: "CompleteRegistration" };
  }
  if (n === "contact") return { meta: "Contact", snap: "CUSTOM_EVENT_1", tiktok: "Contact" };
  return { meta: name, snap: name.toUpperCase(), tiktok: name };
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as any;
  const map = mapEvent(name);
  const results: Record<string, string> = {};

  try {
    if (w.gtag) { w.gtag("event", name, params); results.ga = "sent"; }
    else results.ga = "not-loaded";
  } catch (e) { results.ga = "error"; warn("gtag error", e); }

  try {
    if (w.fbq) { w.fbq("track", map.meta, params); results.meta = `sent (${map.meta})`; }
    else results.meta = "not-loaded";
  } catch (e) { results.meta = "error"; warn("fbq error", e); }

  try {
    if (w.snaptr) { w.snaptr("track", map.snap, params); results.snap = `sent (${map.snap})`; }
    else results.snap = "not-loaded";
  } catch (e) { results.snap = "error"; warn("snaptr error", e); }

  try {
    if (w.ttq?.track) { w.ttq.track(map.tiktok, params); results.tiktok = `sent (${map.tiktok})`; }
    else results.tiktok = "not-loaded";
  } catch (e) { results.tiktok = "error"; warn("ttq error", e); }

  log(`trackEvent("${name}")`, { params, results });
}
