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
- Homepage FAQ uses the shared FAQS content record and the existing accessible accordion, placed after the Dr. Max featured story and before the closing CTA; why: answers reuse established site copy and the section reads as the story's follow-up rather than a page-end block.
- News articles use a shared content record and individual child routes under /company/news; why: full original articles remain readable and directly linkable on this site rather than depending on the old site.
- Partnership graphics compose original approved logo files without generative redrawing and use shared news asset pointers; why: brand identities stay exact and the homepage and article display the same artwork.
- Brand tokens (--cg-*) in src/styles.css are mapped to shadcn semantic names; why: the design spec forbids a second palette and requires a light-only theme.
- A navy section is opt-in only and must use the `on-dark` utility (navy background, white headings, pale body text, cyan links) with brand-token colours; why: the site is light by default, so any blue section is a deliberate choice like the hero's background switch, never a second palette or a dark mode.
- Unapproved content renders via the `Pending` placeholder component, never invented facts; why: brand spec forbids fabricated proof.
- Monetisable insight areas use shared source copy and actual app screenshot asset pointers, with Pending for missing captures; why: the homepage must show the real application rather than invented dashboards.
- Client marks are only the clients' own official files, dropped at src/assets/logos/<slug>.asset.json; until supplied the strip shows the name as a labelled stand-in; why: we never draw a client's identity ourselves.
- The homepage MCP section (WorksWhatYouHave.tsx + MCP_SECTION in content.ts) sits between Solutions and the featured story, and its AI tool marks are only official files under src/assets/tools/; why: third-party tool identities stay exact and the section's claims come from Pan, not invention.
- The homepage hero animation is src/components/site/DataMonetisationHero.tsx: a dependency-free canvas particle animation (Data → Collaboration → Profit) coloured with brand tokens passed as props, with a pause/play control, a static reduced-motion state and off-screen pausing; why: it tells the data-monetisation story, stays SSR-safe and adds no bundle weight. The previous Three.js DataValueAnimation is kept but unused.
