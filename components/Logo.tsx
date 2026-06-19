import Image from "next/image";

/*
  Site logo — the Cabin Zindagi wordmark (public/logo.png).
  The artwork has a transparent background, so it sits directly on the navbar:
  white in light mode, black in dark mode.
*/
export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center">
      <Image
        src="/logo.png"
        alt="Cabin Zindagi — The Human Side of Logistics"
        width={768}
        height={262}
        priority
        className={className}
      />
    </span>
  );
}
