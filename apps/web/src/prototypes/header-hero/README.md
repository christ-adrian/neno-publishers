# Header and hero prototype

From the repository root, run `bun run dev:web` and open [the picker](http://localhost:4321/prototypes/header-hero).

Compare **Centered**, **Editorial**, and **Bookplate** using the picker. When a picker button has focus, use **1**, **2**, **3**, or the arrow keys. The URL keeps the selected variant. Scroll to see the inset header. The five navigation links jump to sample sections on this preview.

The production homepage uses its existing layout while this prototype is under review. Move the selected hero and shared header into production after selection, and migrate the semantic tokens from `theme.css` into the global stylesheet.

## Checks

Run from the repository root:

```sh
(cd apps/web && PLAYWRIGHT_SKIP_BROWSER_GC=1 bunx playwright install chromium --only-shell)
bun run build
bun test apps/web/src/prototypes/header-hero/prototype.test.mjs
```

The suite checks picker controls, scroll state, mobile navigation, and layout at five widths. It launches the built Astro app on an ephemeral loopback port.
