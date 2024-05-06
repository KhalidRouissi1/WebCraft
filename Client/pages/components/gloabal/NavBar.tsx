import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        router.push("/");
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
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
      <nav className="absolute left-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#">Product</Link>
          </li>
          <li>
            <Link href="#plans">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="docs">Documentation</Link>
          </li>
          <li>
            <Link href="workspace">Workspace</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <div className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl"
            >
              Logout
            </button>
          ) : (
            <Link href="/auth">
              <button className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Login or Sign in
              </button>
            </Link>
          )}
        </div>
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  );
};

export default Navbar;
