import Layout from "@/components/base/general-layout";
import { TextLoop } from "@/components/motion-primitives/text-loop";
import { Magnetic } from "@/components/motion-primitives/magnetic";
import Link from "next/link";

export default function Home() {
  return (
    <Layout variant="home">
      <section className="relative flex flex-col justify-between h-full w-full px-8">
        {/* Large summary text */}
        <div className="flex-1 flex items-center">
          <h1 className="font-offbit mt-17 text-[3rem] md:text-[5em] lg:text-[5rem] xl:text-[6rem] leading-none">
            Neeha Ravula is a {/* Mobile: static "developer" */}
            <span className="sm:hidden text-[#94A75D]">developer</span>
            {/* Desktop: animated TextLoop */}
            <span className="hidden sm:inline">
              <TextLoop
                className="overflow-y-clip text-[#94A75D]"
                transition={{
                  type: "spring",
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
                variants={{
                  initial: {
                    y: 20,
                    rotateX: 90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                  animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  exit: {
                    y: -20,
                    rotateX: -90,
                    opacity: 0,
                    filter: "blur(4px)",
                  },
                }}
              >
                <span>developer</span>
                <span>creative</span>
              </TextLoop>
            </span>
            <br />
            based in San Diego, CA, exploring <br /> the intersection of design
            and <br />
            computation.
          </h1>
        </div>

        {/* Links bottom right */}
        <div className="hidden sm:flex flex-col gap-8 text-right text-sm font-[family-name:var(--font-geist-mono)] absolute bottom-8 right-8">
          <Magnetic>
            <div className="relative inline-block">
              <Link href="/work" className="block hover:text-[#94A75D]">
                <span className="text-gray-500">[</span> Work{" "}
                <span className="text-gray-500">]</span>
              </Link>
            </div>
          </Magnetic>
          <Magnetic>
            <div className="relative inline-block">
              <Link href="/play" className="block hover:text-[#94A75D]">
                <span className="text-gray-500">[</span> Play{" "}
                <span className="text-gray-500">]</span>
              </Link>
            </div>
          </Magnetic>
          <Magnetic>
            <div className="relative inline-block">
              <Link href="/resume" className="block hover:text-[#94A75D]">
                <span className="text-gray-500">[</span> Resume{" "}
                <span className="text-gray-500">]</span>
              </Link>
            </div>
          </Magnetic>
        </div>
      </section>
    </Layout>
  );
}
