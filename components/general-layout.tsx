{
  /* Component Layout: lays out nav and footer */
}

import Footer from "@/components/footer";

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
    <div className="flex flex-col min-h-screen h-screen overflow-hidden">
      <main className="flex-1 overflow-auto p-8 sm:p-20">{children}</main>
      {showFooter && <Footer variant={variant} />}
    </div>
  );
};

export default Layout;
