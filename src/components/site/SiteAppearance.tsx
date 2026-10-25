import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const SiteAppearanceContext = createContext({ navy: false, setNavy: (_value: boolean) => {} });

/** Shared presentation state survives client-side page navigation. */
export function SiteAppearanceProvider({ children }: { children: ReactNode }) {
  const [navy, setNavy] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("site-navy", navy);
    return () => document.documentElement.classList.remove("site-navy");
  }, [navy]);

  return <SiteAppearanceContext.Provider value={{ navy, setNavy }}>{children}</SiteAppearanceContext.Provider>;
}

export function useSiteAppearance() {
  return useContext(SiteAppearanceContext);
}