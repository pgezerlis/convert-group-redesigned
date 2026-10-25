import { Link } from "@tanstack/react-router";
import logo from "@/assets/convert-logo.png.asset.json";
import logoWhite from "@/assets/convert-logo-white.png";

/** Original Convert Group logo, used unaltered. */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" aria-label="Convert Group home" className="inline-flex shrink-0 px-0 py-3">
      {inverse ? (
        <img src={logoWhite} alt="" width={112} height={42} className="h-auto w-[98px] lg:w-[112px]" />
      ) : (
        <img src={logo.url} alt="" width={112} height={41} className="h-auto w-[98px] lg:w-[112px]" />
      )}
    </Link>
  );
}
