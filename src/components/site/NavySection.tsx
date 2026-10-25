import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/** Per-section navy background: every homepage section owns its own toggle. */
export function useNavy() {
  const [navy, onNavyChange] = useState(false);
  return { navy, onNavyChange };
}

export function NavySwitch({
  navy,
  onNavyChange,
  className,
}: {
  navy: boolean;
  onNavyChange: (v: boolean) => void;
  className?: string;
}) {
  return (
    <label className={cn("flex w-fit cursor-pointer items-center gap-3 select-none", className)}>
      <Switch
        checked={navy}
        onCheckedChange={onNavyChange}
        className={navy ? "data-[state=unchecked]:bg-pale/40 data-[state=checked]:bg-cyan" : undefined}
      />
      <span className="text-sm text-muted-foreground">Navy background</span>
    </label>
  );
}

/** The switch right-aligned at the top of a section's container. */
export function NavyRow({ navy, onNavyChange }: { navy: boolean; onNavyChange: (v: boolean) => void }) {
  return (
    <div className="flex justify-end">
      <NavySwitch navy={navy} onNavyChange={onNavyChange} />
    </div>
  );
}
