import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
function Header() {
  return (
    <header className=''>
                    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 bg-[#025B70] shadow-sm">
                        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                            <Link href="/" className="flex items-center">
                              <Image 
                              src={"/logo.png"}
                              width={200}
                              height={70}
                               alt='logo of webcraft'
                               />
                            </Link>
                            <div className="flex items-center lg:order-2">
                                <Link href="/auth/login" className="text-gray-800 dark:text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 ">Log in</Link>
                                <a href="#" className="text-white bg-gray-800 hover:bg-gray-800 focus:ring-4 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 ">Get started</a>
                                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                </button>
                            </div>
                            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                       
                            </div>
                        </div>
                    </nav>
                </header>
      
  );
}

export default Header;
