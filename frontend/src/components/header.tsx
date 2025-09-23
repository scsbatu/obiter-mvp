import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { getUserToken, removeUserToken } from "@/utils/cacheStorage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { navItems } from "@/config/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigate();
  const authUser = getUserToken();
  const location = useLocation();

  const isAuthLocation = location.pathname === "/auth"

  const [user, setUser] = useState<null | { name: string; avatar: string }>(
    null
  );

  useEffect(() => {
    setUser({
      name: "John Doe",
      avatar: "https://i.pravatar.cc/35?img=10",
    });
  }, []);

  const handleLogout = () => {
    googleLogout();
    removeUserToken();
    navigation("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigation("/")}
          >
            <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              OBLITER AI
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {authUser
              ? navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-white hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                ))
              : null}
            {!authUser && !isAuthLocation ? (
              <Button
                className="bg-gradient-gold hover:shadow-gold transition-all duration-300 ml-4"
                size="sm"
                onClick={() => navigation("/auth")}
              >
                Login / Signup
              </Button>
            ) : (
              authUser ?
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>:null
            )}
          </nav>
          <button
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-primary transition-colors duration-200 font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="bg-gradient-gold hover:shadow-gold transition-all duration-300 w-fit mt-4"
                size="sm"
                onClick={() => navigation("/auth")}
              >
                Login In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
