export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-5 py-10 text-center text-xs text-white/42 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-cyber-100 via-cyber-300 to-signal-safe">
              <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-ink-950">
                <path d="M12 2 L20 5 V12 C20 17 16.5 20.5 12 22 C7.5 20.5 4 17 4 12 V5 Z" fill="currentColor" />
              </svg>
            </span>
            <span className="font-bold text-white/75">تفادى</span>
            <span className="text-white/35">©</span>
            <span className="text-white/45">2026</span>
          </div>
          <div>صُمم لتحسين وعيك الرقمي. ليس بديلاً عن استشارة متخصص أمن سيبراني.</div>
        </div>
      </div>
    </footer>
  );
}
