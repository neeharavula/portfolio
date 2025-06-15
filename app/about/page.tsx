"use client";

import Layout from "@/components/base/general-layout";
import Image from "next/image";

const AboutPageContent = () => {
  return (
    <div className="flex flex-col items-center px-6 py-10 font-[family-name:var(--font-geist-mono)]">
      {/* Image */}
      <div className="relative w-2/3 max-w-sm aspect-[3/4] mb-8">
        <Image
          src="https://nravula-portfolio-assets.s3.amazonaws.com/about/me.JPG"
          alt="About Image"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Text */}
      <p className="text-center whitespace-pre-wrap leading-relaxed text-sm mt-8">
        Hi, I’m Neeha! I’m a developer and creative based in San Diego, CA
        exploring the intersection of design and computation. I currently work
        as a software developer at a defense and aerospace company called
        General Atomics Aeronautical.
        <br />
        <br />
        Outside of work, you can find me hiking by the beach, messing around on
        my DJ controller, or finding my new song fixation. Feel free to reach
        out or say hi!
      </p>
    </div>
  );
};

export default function AboutPage() {
  return (
    <Layout variant="about">
      <div className="bg-[#111] text-white md:bg-transparent md:text-black min-h-screen">
        <AboutPageContent />
      </div>
    </Layout>
  );
}
