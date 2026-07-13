export default function ReferenceLink({ url, label }) {
  if (!url) return null;

  return (
    <div className="mt-4 flex justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
        className="reference-link inline-flex min-h-11 w-full max-w-md items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-center text-sm font-semibold text-sky-800 shadow-sm transition-colors hover:border-sky-300 hover:bg-sky-100 active:scale-[0.98]"
      >
        {label}
      </a>
    </div>
  );
}
