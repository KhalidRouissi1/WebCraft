import React from "react";

const Footer = () => {
  const footerLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Sales Policy",
    "Legal",
    "Site Map",
  ];

  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            To Contact or ask{" "}
            <span className="underline text-blue">
              <a
                href="https://www.linkedin.com/in/khalid-rouissi-6a136b242/"
                target="_blank"
              >
                Find me on LinkedIn{" "}
              </a>
            </span>
            or{" "}
            <span className="underline text-blue">
              <a href="mailto:khalidrouissi7@gmail.com">Send an email</a>
            </span>{" "}
            khalidrouissi7@gmail.com
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call +216 26 568 910
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Copright @ 2024 Khalid Rouissi . All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="font-semibold text-gray text-xs">
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
