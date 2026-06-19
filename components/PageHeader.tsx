export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-b border-black/5 bg-cream/70 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl opacity-70">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
