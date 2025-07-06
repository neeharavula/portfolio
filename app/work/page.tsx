/* Work page */

"use client";

import Layout from "@/components/base/general-layout";
import WorkDesktop from "@/components/work/desktop";
import WorkMobile from "@/components/work/mobile";
import useMediaQuery from "@/hooks/use-media-query";

/* Work */
export default function Work() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Layout variant="work">
      <main className="h-full">
        {isDesktop ? <WorkDesktop /> : <WorkMobile />}
      </main>
    </Layout>
  );
}
