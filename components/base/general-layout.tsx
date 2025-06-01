{
  /* Base Component: page layout */
}

import Nav from "@/components/base/nav";
import Footer from "@/components/base/footer";

export interface LayoutConfig {
  variant: "home" | "work" | "project" | "play" | "about" | "menu";
}

type LayoutProps = {
  children: React.ReactNode;
  variant: LayoutConfig["variant"];
  projectTitle?: string;
};

const Layout = ({ children, variant, projectTitle }: LayoutProps) => {
  const showFooter = variant !== "project";
  const isScrollable = ["play", "about", "work"].includes(variant);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Nav
        variant={variant}
        projectTitle={variant === "project" ? projectTitle : undefined}
      />
      <main className={`flex-1 ${isScrollable ? "overflow-auto" : ""}`}>
        {children}
      </main>
      {showFooter && <Footer variant={variant} />}
    </div>
  );
};

export default Layout;
