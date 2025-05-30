import Layout from "@/components/base/general-layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout variant="home">
      <section className="felx flex-col h-full w-full p-8 sm:p-20 grid grid-cols-1 sm:grid-cols-[1fr_3fr_1fr] sm:grid-rows-1 sm:gap-8 text-sm font-[family-name:var(--font-geist-mono)]">
        {/* Desktop */}
        {/* Empty space */}
        <div className="hidden sm:block" />

        {/* Room placeholder */}
        <div className="flex justify-center items-center py-8 sm:py-0">
          <div className="w-full h-[300px] sm:h-[500px] flex items-center justify-center">
            <span className="hidden sm:block text-gray-500 text-center">
              Room under construction.
              <br />
              <br />
              <Link href="/work">Work</Link>
              <br />
              <Link href="/play">Play</Link>
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="hidden sm:flex items-center justify-center px-4">
          <p className="text-center">
            Welcome to my room! Explore and click around to learn more about me.
          </p>
        </div>

        {/* Mobile */}
        {/* Room placeholder */}
        <span className="sm:hidden text-gray-500 text-center">
          Room under construction.
        </span>
        {/* Caption */}
        <div className="sm:hidden mt-8 px-4">
          <p className="text-center">
            Welcome to my room! View on desktop for an interactive experience.
          </p>
        </div>
      </section>
    </Layout>
  );
}
