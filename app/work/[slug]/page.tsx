/* Case study page */

"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { workProjects } from "@/data/work-projects";

const sections = [
  { id: "overview", label: "OVERVIEW" },
  { id: "contributions", label: "CONTRIBUTIONS" },
  { id: "reflections", label: "REFLECTIONS" },
] as const;

type Section = (typeof sections)[number]["id"];

export default function WorkCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = workProjects.find((p) => p.slug === slug);
  const [activeSection, setActiveSection] = useState<Section>("overview");

  if (!project) {
    notFound();
  }

  const scrollToSection = (id: Section) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const infoColumns = [
    { label: "Timeline", value: project.timeline },
    { label: "Role", value: project.role },
    { label: "Team", value: project.team },
    {
      label: "Tags",
      value: (
        <div className="flex flex-wrap gap-sm">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-background-code px-sm py-xs text-xs text-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    { label: "Stack", value: null },
  ];

  return (
    <main className="w-full flex-1 max-w-7xl mx-auto px-xl md:px-16 pt-md md:pt-16 pb-xl font-content text-sm">
      {/* Back link */}
      <Link
        href="/"
        className="font-navigation text-xs text-tertiary uppercase hover:text-accent"
      >
        ← Back to all work
      </Link>

      {/* Title */}
      <h1 className="font-header text-2xl md:text-3xl text-header mt-16">
        {project.name}
        <br />/ {project.org}
      </h1>

      {/* Info columns */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-x-lg gap-y-lg mt-16">
        {infoColumns.map(({ label, value }) => (
          <div key={label}>
            <p className="font-navigation text-xs text-tertiary uppercase">
              {label}
            </p>
            <div className="text-primary mt-sm">{value}</div>
          </div>
        ))}
      </div>

      <hr className="border-t-[0.5px] border-page-divider mt-16 mb-16" />

      {/* Case study content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-lg gap-y-lg">
        {/* Table of contents */}
        <nav className="hidden md:flex md:flex-col gap-md md:gap-sm font-navigation text-sm uppercase h-fit">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`text-left cursor-pointer ${
                activeSection === id ? "text-accent" : "text-tertiary"
              }`}
            >
              {activeSection === id ? `[ ${label} ]` : label}
            </button>
          ))}
        </nav>

        {/* Sections */}
        <div className="md:col-span-4 space-y-16">
          <section id="overview">
            <h2 className="font-header text-2xl text-header">Overview</h2>
            <p className="text-primary mt-md">{project.overview}</p>
          </section>

          <section id="contributions">
            <h2 className="font-header text-2xl text-header">
              Contributions
            </h2>
            <p className="text-primary mt-md">{project.contributions}</p>
          </section>

          <section id="reflections">
            <h2 className="font-header text-2xl text-header">Reflections</h2>
            <p className="text-primary mt-md">{project.reflections}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
