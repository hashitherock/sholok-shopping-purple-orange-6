<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Store data (products, categories, promotions, nav, homepage section order) lives in src/data; components stay presentational — so campaigns are configurable without touching UI.
- All shop state (cart, wishlist, compare, searches, location) lives in src/context/ShopProvider and is read via src/hooks/useShop — one source of truth across header, drawer and cards.
- Scheduled campaign visibility uses the shared active-promotion hook and date predicate; popup impressions use session storage so inactive offers never flash and visits do not repeat the popup.
- Checkout and seller submissions remain browser-local drafts, never paid or transmitted orders, because no commerce service is connected.
- Reference category SVG geometry is stored as local data and rendered with currentColor so icons retain the design system's category color.
