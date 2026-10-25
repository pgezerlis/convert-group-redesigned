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

- Site nav/CTA config lives in src/lib/site.ts and page copy/example data in src/lib/content.ts; why: one source of truth for labels, destinations and illustrative content.
- Brand tokens (--cg-*) in src/styles.css are mapped to shadcn semantic names; why: the design spec forbids a second palette and requires a light-only theme.
- Unapproved content renders via the `Pending` placeholder component, never invented facts; why: brand spec forbids fabricated proof.
- Client marks are only the clients' own official files, dropped at src/assets/logos/<slug>.asset.json; until supplied the strip shows the name as a labelled stand-in; why: we never draw a client's identity ourselves.
- The homepage hero animation is src/components/site/DataMonetisationHero.tsx: a dependency-free canvas particle animation (Data → Collaboration → Profit) coloured with brand tokens passed as props, with a pause/play control, a static reduced-motion state and off-screen pausing; why: it tells the data-monetisation story, stays SSR-safe and adds no bundle weight. The previous Three.js DataValueAnimation is kept but unused.
