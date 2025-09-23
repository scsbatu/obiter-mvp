import { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

import "../mainContanier.scss";

interface MainContentViewLayoutProps {
  children: ReactNode;
}

export const MainContentViewLayout = ({
  children,
}: MainContentViewLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
