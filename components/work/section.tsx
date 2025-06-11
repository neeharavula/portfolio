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
    <section className={`flex flex-col md:flex-row md:py-8 py-4 ${className}`}>
      <div className="w-full md:w-1/4 text-sm text-gray-400">{title}</div>
      <div className="w-full md:w-3/4 py-4 md:py-0">{children}</div>
    </section>
  );
}
