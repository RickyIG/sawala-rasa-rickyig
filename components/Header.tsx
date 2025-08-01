import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:block">SawalaRasa</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              {/* <Link href="/articles" className="text-foreground hover:text-primary transition-colors font-medium">
                Articles
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </Link> */}
              <Link href="https://saweria.co/rickyindrag" className="text-foreground hover:text-primary transition-colors font-medium">
                Donate
              </Link>
            </nav>
          </div>

          {/* Right side - Getting Started Button */}
          <div className="flex items-center space-x-4">
            {/* <Button className="hidden sm:flex">
              Getting Started
            </Button> */}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            <Link href="/" className="block px-2 py-2 text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/articles" className="block px-2 py-2 text-foreground hover:text-primary transition-colors">
              Articles
            </Link>
            <Link href="/about" className="block px-2 py-2 text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/donate" className="block px-2 py-2 text-foreground hover:text-primary transition-colors">
              Donate
            </Link>
            <div className="pt-2">
              <Button className="w-full sm:hidden">
                Getting Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;