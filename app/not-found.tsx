// app/not-found.tsx
// Custom 404 page — technical tone, on-brand

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Error code */}
        <p className="font-mono text-8xl font-bold text-ink-800 mb-2 select-none">
          404
        </p>

        {/* Terminal-style message */}
        <div className="mb-8 font-mono text-sm text-ink-500 bg-ink-900 rounded-lg border border-ink-800 p-4 text-left">
          <p className="text-signal mb-1">$ find / -name "this-page"</p>
          <p className="text-red-400">find: No such file or directory</p>
          <p className="text-ink-600 mt-1">exit code: 1</p>
        </div>

        <h1 className="font-display text-2xl font-bold text-ink-50 mb-3">
          Page not found
        </h1>
        <p className="text-ink-400 text-sm mb-8">
          The route you're looking for doesn't exist. It may have been moved, deleted,
          or never existed.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <span>go home</span>
          </Link>
          <Link href="/#projects" className="btn-ghost">
            <span>see projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
