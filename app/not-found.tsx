
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f7f5ef] px-5 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-heading text-8xl font-semibold text-[#b66b50]">
          404
        </p>

        <h1 className="mt-5 font-heading text-4xl font-semibold text-[#292b27]">
          Looks like this space doesn&apos;t exist.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#74766d]">
          The page you&apos;re looking for may have been moved, removed, or never
          existed. Let&apos;s get you back to discovering creative spaces.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#344638] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#29392d]"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-full border border-[#d8d5ca] px-6 py-3 text-sm font-medium text-[#344638] transition hover:bg-[#eeece4]"
          >
            <ArrowLeft className="h-4 w-4" />
            Explore Studios
          </Link>
        </div>

        <p className="mt-12 text-xs font-medium tracking-widest text-[#a09e93]">
          STUDIOSPACE
        </p>
      </div>
    </main>
  );
}
