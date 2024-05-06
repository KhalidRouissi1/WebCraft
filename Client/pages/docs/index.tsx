import React from "react";
import Navbar from "../components/gloabal/NavBar";

const index = () => {
  return (
    <div className="flex  items-center justify-center">
      <Navbar />
      <div className="bg-gray-900 text-white h-screen flex justify-center items-center mt-56">
        <div className="bg-gray-800 p-8 shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Your Website Builder "WebCrafter" Documentation
          </h1>
          <p className="text-lg mb-4">
            This documentation provides detailed information on how to use
            "WebCrafter" to build and customize your website.
          </p>
          <h2 className="text-2xl font-bold mb-2">Getting Started</h2>
          <p className="mb-4">
            To get started with "WebCrafter", follow these steps:
          </p>
          <ul className="list-disc pl-8 mb-2">
            <li>Sign up for an account or log in if you already have one.</li>
            <li>Create a new project or select an existing one.</li>
            <li>Explore the editor interface and available features.</li>
            <li>
              Start building your website by adding components and customizing
              the design.
            </li>
          </ul>
          <h2 className="text-2xl font-bold mb-2">Components</h2>
          <p className="mb-4">
            "WebCrafter" provides a variety of components to help you build your
            website:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Header</li>
            <li>Footer</li>
            <li>Navigation Bar</li>
            {/* Add more components here */}
          </ul>
          <h2 className="text-2xl font-bold mb-2">Customization</h2>
          <p className="mb-4">
            Customize the appearance of your website using "WebCrafter" with
            ease. You can:
          </p>
          <ul className="list-disc pl-8 mb-2">
            <li>Adjust colors, fonts, and sizes.</li>
            <li>Add custom styles or use predefined templates.</li>
            <li>Preview your changes in real-time.</li>
          </ul>
          <h2 className="text-2xl font-bold mb-2">Examples</h2>
          <p className="mb-4">
            Explore some examples of how you can use "WebCrafter" to style your
            website:
          </p>
          <ul className="list-disc pl-8">
            <li>
              {/* <code className="bg-gray-200 px-2 py-1 rounded-md">bg-red-500</code>{" "}
            - Sets the background color to red */}
            </li>
            <li>
              {/* <code className="bg-gray-200 px-2 py-1 rounded-md">
              text-blue-700
            </code>{" "}
            - Sets the text color to blue */}
            </li>
            {/* Add more examples here */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
