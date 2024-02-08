
const Footer = () => {
  return (
    <div className="flex items-end w-full  bg-white">
      <footer className="w-full text-gray-700 bg-gray-100 body-font">
        <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
              {/* Your SVG content */}
            </a>
            <p className="mt-2 text-sm text-gray-500">Design, Code and Ship!</p>
            <div className="mt-4">
              {/* Your social media icons */}
            </div>
          </div>
          <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            {/* Your navigation sections */}
          </div>
        </div>
        <div className="bg-gray-300">
          <div className="container px-5 py-4 mx-auto">
            <p className="text-sm text-gray-700 capitalize xl:text-center">© 2020 All rights reserved </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
