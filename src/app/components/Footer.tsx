export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-[#0a0f1a] pb-20">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-center text-sm text-slate-500">
          © 2024 DevProse. Engineer-Writer Collective.
        </p>
        <div className="mt-3 flex items-center justify-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            Documentation
          </a>
          <a
            href="#"
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            RSS Feed
          </a>
          <a
            href="#"
            className="text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
