import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-4xl font-bold text-slate-300">404</h1>
      <p className="text-sm text-slate-500">This page doesn't exist.</p>
      <Link to="/" className="mt-2 text-sm font-semibold text-brand-600 hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
