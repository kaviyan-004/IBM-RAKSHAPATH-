import type { LucideIcon } from "lucide-react";

interface SectorPlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * Reusable stand-in for sector pages that don't have a bespoke screen yet.
 * Keeps every nav item/route in the sector matrix real and testable
 * (visible in the sidebar, reachable, guarded) without fabricating UI for
 * capabilities the PRD hasn't specified for the Technical/Public sectors.
 */
export default function SectorPlaceholderPage({ title, description, icon: Icon }: SectorPlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Icon size={26} />
      </span>
      <h1 className="mt-4 text-lg font-bold text-slate-900">{title}</h1>
      <p className="mt-1 max-w-md text-sm text-slate-500">{description}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">Coming soon</p>
    </div>
  );
}
