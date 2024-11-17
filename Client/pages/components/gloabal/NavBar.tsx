import { useState, useEffect } from 'react';
import { MenuIcon, X, User, LogOut, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          credentials: 'include',
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setError('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLogoutLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setIsLoggedIn(false);
        router.push('/');
      } else {
        setError('Failed to logout. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Network error while logging out');
    } finally {
      setIsLogoutLoading(false);
    }
  };

  const navLinks = [
    { href: '#', label: 'Product' },
    { href: '#plans', label: 'Pricing' },
    { href: '#', label: 'Clients' },
    { href: 'docs', label: 'Documentation' },
    { href: 'workspace', label: 'Workspace' },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] border-b-[1px] border-neutral-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <aside className="flex items-center gap-[2px]">
          <Link href="/">
            <Image
              src="/webCrafterLogo.png"
              width={250}
              height={250}
              alt="NEXT VISION Logo"
              className="shadow-sm"
            />
          </Link>
        </aside>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 list-none text-white">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <aside className="flex items-center gap-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-50">
            {isLoading ? (
              <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-4 py-1">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            ) : isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={isLogoutLoading}
                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors duration-200 gap-2"
              >
                {isLogoutLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </>
                )}
              </button>
            ) : (
              <Link href="/auth" className="w-full">
                <button className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors duration-200 gap-2">
                  <User className="h-4 w-4" />
                  Login or Sign in
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden text-white hover:text-gray-300 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </aside>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-neutral-900">
          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-4 list-none text-white">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-300 transition-colors duration-200 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
