import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-6">
      <h1 className="font-display font-extrabold text-[3rem] tracking-tight text-fg">
        404
      </h1>
      <p className="text-sm uppercase tracking-widest font-body text-fg/50">
        Category not found
      </p>
      <Link
        href="/"
        className="mt-4 text-[0.72rem] uppercase tracking-[0.15em] font-body text-accent no-underline hover:underline"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}
