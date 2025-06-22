import Layout from "@/components/base/general-layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout variant="home">
      <section className="flex flex-col justify-between h-full w-full px-8">
        {/* Large summary text */}
        <div className="flex-1 flex items-center">
          <h1 className="font-offbit text-[3rem] md:text-[4em] lg:text-[4rem] xl:text-[6rem] leading-none">
            {/* Example summary */}
            Neeha Ravula is a developer <br></br>based in San Diego, CA,
            exploring <br></br> the intersection of design and <br></br>
            computation.
          </h1>
        </div>

        {/* Links bottom left */}
        <div className="flex flex-col gap-6 text-sm font-[family-name:var(--font-geist-mono)] hidden sm:flex">
          <Link href="/work" className="hover:underline">
            [ Work ]
          </Link>
          <Link href="/play" className="hover:underline">
            [ Play ]
          </Link>
          <Link
            href="https://read.cv/nravula"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            [ Resume ]
          </Link>
        </div>
      </section>
    </Layout>
  );
}
