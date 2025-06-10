import { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`flex flex-col md:flex-row gap-6 md:gap-12 py-8 ${className}`}
    >
      <div className="w-full md:w-1/3 text-base font-semibold text-muted-foreground">
        {title}
      </div>
      <div className="w-full md:w-2/3">{children}</div>
    </section>
  );
}
