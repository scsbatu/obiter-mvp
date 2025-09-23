import { Separator } from "@/components/ui/separator";
import { footerLinks } from "@/config/constants";

const Footer = () => {
  const linkClass =
    "text-sm text-light-gold hover:text-primary transition-colors";
  return (
    <footer className="bg-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-light-gold text-sm md:text-base">
            Legal Intelligence Redefined
          </span>
          <p className="text-light-gold text-sm">
            © {new Date().getFullYear()} Obliter AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
