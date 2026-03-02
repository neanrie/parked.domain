/* Reuse of my own favicon.js from FrontendLinks's theme (https://github.com/neanrie/yourls.frontend-links) */


/**
 * Nyerou Original Theme - Adaptive Favicon
 * ==========================================
 *
 * Dynamically switches the favicon based on the user's color-scheme preference:
 *   - Dark mode  → white favicon (stands out against dark browser UI)
 *   - Light mode → black favicon (stands out against light browser UI)
 *   - No preference detected → colorful favicon (default, already set in HTML)
 *
 * Derives asset paths from its own script URL — no config injection needed.
 * Updates dynamically if the user changes their OS/browser theme at runtime.
 *
 * @package FrontendLinks
 */

(function () {
    // ── Resolve img/logo/ base URL from this script's own src ────
    var scriptEl = document.currentScript
        || document.querySelector('script[src*="favicon.js"]');

    if (!scriptEl) return;

    // .../assets/js/favicon.js → .../assets/img/logo/
    var base = scriptEl.src.replace(/\/js\/favicon\.js[^/]*$/, '/img/logo/');

    // ── Helpers ──────────────────────────────────────────────────
    function getFaviconLink() {
        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            document.head.appendChild(link);
        }
        return link;
    }

    function apply() {
        var href;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            href = base + 'white.png';    // White stands out on a dark browser UI
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            href = base + 'black.png';    // Black stands out on a light browser UI
        } else {
            return;                       // No preference — keep the colorful default
        }
        getFaviconLink().href = href;
    }

    // ── Watch for OS/browser theme changes ───────────────────────
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', apply);
    } else if (typeof mq.addListener === 'function') {
        mq.addListener(apply); // Safari < 14 fallback
    }

    // ── Apply immediately ────────────────────────────────────────
    apply();
})();
