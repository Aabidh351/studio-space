
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5 bg-background">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-border border-t-primary" />

        <span className="h-2.5 w-2.5 rounded-full bg-[#b66b50]" />
      </div>

      <div className="text-center">
        <p className="font-heading text-2xl font-semibold tracking-tight text-primary">
          StudioSpace<span className="text-[#b66b50]">.</span>
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Loading My Listings...
        </p>
      </div>
    </div>
  );
}
