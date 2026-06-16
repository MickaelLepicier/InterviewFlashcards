export default function LoadingSpinner({ label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
