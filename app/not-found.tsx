// app/not-found.tsx
// Custom 404 page — technical tone, on-brand

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center max-w-md">
        {/* Error code */}
        <p className="font-display text-8xl font-light text-text-dim/30 mb-2 select-none">
          404
        </p>

        {/* Terminal-style message */}
        <div className="mb-8 font-mono text-[11px] text-text-muted cinematic-box tracking-widest text-left p-6">
          <p className="text-gold mb-1">$ FIND / -NAME "THIS-PAGE"</p>
          <p className="text-red-400">ERROR: NO SUCH FILE OR DIRECTORY</p>
          <p className="text-text-dim mt-2">EXIT CODE: 1</p>
        </div>

        <h1 className="font-display text-2xl font-medium text-white mb-3 tracking-wide">
          Page not found
        </h1>
        <p className="text-text-dim text-sm mb-8 font-light">
          The route you're looking for doesn't exist. It may have been moved, deleted,
          or never existed.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary min-w-[140px] justify-center">
            <span>GO HOME</span>
          </Link>
          <Link href="/#projects" className="btn-ghost min-w-[140px] justify-center">
            <span>SEE PROJECTS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
