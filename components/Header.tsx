import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactGA from 'react-ga4';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';

const Header = ({ currentLink = '', loading = false }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleThemeMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    ReactGA.event({
      category: 'Theme',
      action: 'Header Mode Toggle',
      label: `${theme} to ${theme === 'dark' ? 'light' : 'dark'}`,
      value: 1,
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const NavLinks = ({ mobile = false, onLinkClick = () => {} }) => (
    <>
      <Link href="/" passHref>
        <Button
          variant="link"
          onClick={onLinkClick}
          className={`${currentLink === '' ? 'text-primary' : 'text-muted-foreground'} ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
        >
          Home
        </Button>
      </Link>
      <Link href="/projects" passHref>
        <Button
          variant="link"
          onClick={onLinkClick}
          className={`${currentLink === 'projects' ? 'text-primary' : 'text-muted-foreground'} underline-offset-2 ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
        >
          Projects
        </Button>
      </Link>
      <Link href="/blogs" passHref>
        <Button
          variant="link"
          onClick={onLinkClick}
          className={`${currentLink === 'blogs' ? 'text-primary' : 'text-muted-foreground'} ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
        >
          Blogs
        </Button>
      </Link>
      <Link href="/resume" passHref>
        <Button
          variant="link"
          onClick={onLinkClick}
          className={`${currentLink === 'resume' ? 'text-primary' : 'text-muted-foreground'} ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
        >
          Resume
        </Button>
      </Link>
      {mobile && (
        <Link href="/tars" passHref>
          <Button
            variant="link"
            onClick={onLinkClick}
            className={`${currentLink === 'tars' ? 'text-primary' : 'text-muted-foreground'} ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
          >
            AI Assistant
          </Button>
        </Link>
      )}
      <Button
        variant="link"
        onClick={() => {
          ReactGA.event({ category: 'Button.Click', action: 'Github Link' });
          window.open('https://github.com/UWINTWALI');
          onLinkClick();
        }}
        className={`text-muted-foreground ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
      >
        {mobile && <Github className="mr-2 h-4 w-4" />}
        Github
      </Button>
      <Button
        variant="link"
        onClick={() => {
          ReactGA.event({ category: 'Button.Click', action: 'Linkedin Link' });
          window.open('https://www.linkedin.com/in/uwintwali-umd/');
          onLinkClick();
        }}
        className={`text-muted-foreground ${mobile ? 'justify-start w-full text-lg h-12' : ''}`}
      >
        {mobile && <Linkedin className="mr-2 h-4 w-4" />}
        LinkedIn
      </Button>
    </>
  );

  return (
    <>
      {/* Sticky header with shadow */}
      <div className="sticky top-0 left-0 bg-background z-50 shadow-md">
        <div className="flex justify-center header-nav-container">
          <div className="w-full px-3 sm:px-6 md:px-8 lg:px-10 sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px] py-4 flex justify-between items-center relative header-nav-content">
            {/* Logo / Brand */}
            <Button
              variant="link"
              onClick={() => {
                window.open('https://www.linkedin.com/in/uwintwali-umd/');
                ReactGA.event({
                  category: 'Button.Click',
                  action: '@uwintwali linkedin',
                });
              }}
              className="font-thin text-sm sm:text-base md:text-lg lg:text-xl no-underline text-center min-w-0 flex-shrink-0 text-muted-foreground"
            >
              <span className="truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[150px] md:max-w-none">
                @uwintwali
              </span>
            </Button>

            {/* Mobile Controls */}
            <div className="sm:hidden flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleThemeMode}
                aria-label="Toggle theme mode"
              >
                {mounted ? (
                  theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )
                ) : (
                  <span className="h-4 w-4 inline-block" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-1 md:gap-2 lg:gap-3 flex-1 justify-end min-w-0">
              <div className="flex items-center gap-1 md:gap-2 lg:gap-3 overflow-x-auto scrollbar-hide flex-shrink min-w-0">
                <NavLinks />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleThemeMode}
                className="ml-2"
                aria-label="Toggle theme mode"
              >
                {mounted ? (
                  theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )
                ) : (
                  <span className="h-4 w-4 inline-block" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 xs:w-80 sm:w-96 max-w-[85vw] bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out z-50 sm:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 h-full bg-background overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Navigation
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col space-y-1">
            <NavLinks mobile={true} onLinkClick={closeMobileMenu} />

            {/* Theme Mode Toggle */}
            <div className="border-t border-border pt-4 mt-4">
              <Button
                variant="ghost"
                onClick={toggleThemeMode}
                className="justify-start w-full text-lg h-12"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" /> Dark Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
