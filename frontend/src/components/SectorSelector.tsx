import { Building2, Check, FlaskConical, Users } from "lucide-react";
import type { Sector } from "@/types";

interface SectorOption {
  value: Sector;
  title: string;
  description: string;
  icon: typeof Building2;
}

const OPTIONS: SectorOption[] = [
  { value: "government", title: "Government", description: "For authorities and road-safety decisions", icon: Building2 },
  { value: "technical", title: "Technical", description: "For analysts, engineers and researchers", icon: FlaskConical },
  { value: "public", title: "Public", description: "For citizens and road users", icon: Users },
];

interface SectorSelectorProps {
  value: Sector | undefined;
  onChange: (sector: Sector) => void;
  error?: string;
}

/**
 * Accessible 3-card sector picker: a `radiogroup` of `radio`-role cards
 * (not a plain text field) so the choice is keyboard-navigable and
 * programmatically identifiable, with a visible check mark — not just a
 * color change — for the selected state.
 */
export default function SectorSelector({ value, onChange, error }: SectorSelectorProps) {
  return (
    <div>
      <p id="sector-label" className="mb-1 block text-sm font-medium text-loginNeutral-800">
        Select your sector
      </p>
      <div role="radiogroup" aria-labelledby="sector-label" aria-required="true" className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {OPTIONS.map(({ value: optionValue, title, description, icon: Icon }) => {
          const selected = value === optionValue;
          return (
            <button
              key={optionValue}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(optionValue)}
              className={`relative flex flex-col items-start gap-1.5 rounded-lg border p-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 ${
                selected ? "border-primary-500 bg-primary-50" : "border-secondary-200 bg-white hover:border-primary-200 hover:bg-primary-50/40"
              }`}
            >
              <span className="flex w-full items-center justify-between">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${selected ? "bg-primary-500 text-white" : "bg-secondary-100 text-secondary-600"}`}>
                  <Icon size={17} />
                </span>
                {selected && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary-600">
                    <Check size={14} /> Selected
                  </span>
                )}
              </span>
              <span className="text-sm font-semibold text-primary-900">{title}</span>
              <span className="text-xs leading-snug text-secondary-500">{description}</span>
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
