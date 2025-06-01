import Layout from "@/components/base/general-layout";
import WorkDesktop from "@/components/work/desktop";
import WorkMobile from "@/components/work/mobile";

export default function Work() {
  return (
    <Layout variant="work">
      <main className="px-4 md:px-16 py-12">
        <WorkDesktop />
        <WorkMobile />
      </main>
    </Layout>
  );
}
