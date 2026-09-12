export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex h-40 flex-col items-center justify-center gap-2 text-slate-400">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
