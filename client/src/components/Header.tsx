import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { useMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ui/theme-provider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMobile();

  const navItems = [
    { label: "About", href: `#${SECTION_IDS.ABOUT}` },
    { label: "Skills", href: `#${SECTION_IDS.SKILLS}` },
    { label: "Portfolio", href: `#${SECTION_IDS.PORTFOLIO}` },
    { label: "GitHub", href: `#${SECTION_IDS.GITHUB}` },
    { label: "Contact", href: `#${SECTION_IDS.CONTACT}` },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full ${scrolled ? "bg-white bg-opacity-95 shadow-sm" : "bg-transparent"} z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href={`#${SECTION_IDS.HERO}`} className="text-xl font-bold text-primary flex items-center space-x-2">
            <span>John Doe</span>
          </a>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href} 
                      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                      onClick={() => {
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="ml-6">
                <ThemeToggle />
              </div>
            </nav>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && (
        <div className={`${isOpen ? "block" : "hidden"} bg-white dark:bg-gray-900 border-t dark:border-gray-800`}>
          <div className="container mx-auto px-4 py-3">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pb-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Toggle theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
