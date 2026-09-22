/* Home page */

import HomeHeader from "@/components/home-header";
import WorkGrid from "@/components/work-grid";
import { getAllWorkProjects } from "@/lib/work-projects";

export default function Home() {
  const workProjects = getAllWorkProjects();

  return (
    <main className="flex-1 px-xl md:px-16 pt-md md:pt-16 pb-xl font-content text-sm">
      <HomeHeader />

      <hr className="border-t-[0.5px] border-page-divider mt-16 mb-16" />

      <WorkGrid projects={workProjects} />
    </main>
  );
}
