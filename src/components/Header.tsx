import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, LogOut, User, Search, PlusCircle, Newspaper, Settings, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onLoginClick: (role?: "buyer" | "seller") => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMode, setActiveMode] = useState<"buyer" | "seller">("buyer");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleToggle = (mode: "buyer" | "seller") => {
    setActiveMode(mode);
    onLoginClick(mode);
  };

  const isListingsPage = location.pathname === "/listings";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-foreground">Lister</span>
        </Link>
        <nav className="flex items-center space-x-1 md:space-x-2">
          {!isAuthenticated ? (
            <>
              <div className="relative flex items-center bg-gray-400 dark:bg-gray-800 rounded-full p-1">
                {/* Sliding background */}
                <div 
                  className={`absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ease-in-out ${
                    activeMode === "buyer" ? "left-1 right-[50%]" : "left-[50%] right-1"
                  }`}
                />
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggle("buyer")} 
                  className={`relative z-10 text-sm font-medium flex items-center gap-2 rounded-full transition-colors ${
                    activeMode === "buyer" ? "text-primary-foreground hover:text-primary-foreground" : "text-foreground hover:bg-transparent"
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav_buy')}</span>
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggle("seller")} 
                  className={`relative z-10 text-sm font-medium flex items-center gap-2 rounded-full transition-colors ${
                    activeMode === "seller" ? "text-primary-foreground hover:text-primary-foreground" : "text-foreground hover:bg-transparent"
                  }`}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav_sell')}</span>
                </Button>
              </div>
            </>
          ) : (
            !isListingsPage && (
              <Link to="/listings">
                <Button variant="ghost" className="text-sm font-medium flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav_listings')}</span>
                </Button>
              </Link>
            )
          )}
          <Button variant="ghost" className="text-sm font-medium flex items-center gap-2">
            <Newspaper className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav_news')}</span>
          </Button>
          <div className="flex items-center space-x-1 ml-2">
            <LanguageToggle />
            <ModeToggle />
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-md">
                    <User className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-lg">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.role === 'buyer' ? 'Buyer Account' : 'Seller Account'}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-md">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-md">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Saved Properties</span>
                  </DropdownMenuItem>
                  {user?.role === 'seller' && (
                    <DropdownMenuItem className="rounded-md">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>My Listings</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="rounded-md">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-md text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;