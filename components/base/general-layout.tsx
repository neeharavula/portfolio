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
};

const Layout = ({ children, variant }: LayoutProps) => {
  const showFooter = variant !== "project";

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Nav variant={variant} />
      <main className="flex-1 overflow-auto">{children}</main>
      {showFooter && <Footer variant={variant} />}
    </div>
  );
};

export default Layout;
