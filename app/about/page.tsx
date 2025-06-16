"use client";

import Layout from "@/components/base/general-layout";
import Image from "next/image";
import {
  EnvelopeIcon,
  LinkedinLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  SpotifyLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

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

      {/* Social icons at bottom */}
      <div className="flex justify-center items-center gap-8 mt-8">
        <Link
          href="mailto:ravulaneeha@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <EnvelopeIcon size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/neeharavula/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinLogoIcon size={20} />
        </Link>
        <Link
          href="https://github.com/neeharavula"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogoIcon size={20} />
        </Link>
        <Link
          href="https://www.instagram.com/neehasroll/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramLogoIcon size={20} />
        </Link>
        <Link
          href="https://open.spotify.com/user/awesomesauce872?si=0ea3f9e157784457"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SpotifyLogoIcon size={20} />
        </Link>
      </div>
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
