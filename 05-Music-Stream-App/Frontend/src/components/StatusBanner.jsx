export function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
      {message}
    </div>
  );
}

export function EmptyState({ title, subtitle }) {
  return (
    <div className="waveline rounded-lg border border-line bg-surface/40 px-6 py-16 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-amber" />
    </div>
  );
}