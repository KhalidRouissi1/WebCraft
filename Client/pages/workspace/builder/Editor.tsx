import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import editorSettings from "../../../helper/editor";
import axios from "axios";
import Joyride, { STATUS } from "react-joyride";
import html2canvas from "html2canvas";
import { FaHome, FaDesktop } from "react-icons/fa";
import Link from "next/link";

export default function Editor({ id }) {
  const [projectCreated, setProjectCreated] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // @ts-ignore
    const editor = grapesjs.init(editorSettings);
    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
    });

    // @ts-ignore
    editor.on("storage:store", async function (e) {
      try {
        // Send PUT request to your API to save the content
        const res = await axios.put(`http://127.0.0.1:8000/api/project/${id}`, {
          data: JSON.stringify(editor.getComponents()),
        });
        console.log("Content saved:", res.data);

        // Optionally, you can handle response data here
      } catch (error) {
        console.error("Error saving content:", error);
        // Optionally, you can handle error response here
      }
    });

    // Event listener for loading content
    editor.on("load", async function (e) {
      try {
        // Send GET request to your API to retrieve the content
        const res = await axios.get(`http://127.0.0.1:8000/api/project/${id}`);
        console.log("Content loaded:", res.data);

        if (res.data.data) {
          // Set the retrieved content to the editor
          editor.setComponents(JSON.parse(res.data.data));
        } else {
          console.log("No content found in the API response");
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    });

    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "<>",
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`
              )
              .open();
          },
        },
      ],
    });
    editor.Commands.add("set-device-desktop", {
      // @ts-ignore

      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
      // @ts-ignore

      run: (editor) => editor.setDevice("Mobile"),
    });

    // destroy on exit
    return () => {
      editor.destroy();
    };
  }, [id]);

  const [showJoyride, setShowJoyride] = useState(false);

  useEffect(() => {
    // Check if it's the user's first visit to the page
    const doneJoyride = localStorage.getItem("Done");
    if (!doneJoyride) {
      setShowJoyride(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      // Hide Joyride after completion
      localStorage.setItem("Done", "true");
      setShowJoyride(false);
    }
  };

  const joyrideButtonStyles = {
    buttonNext: {
      background: "#BFA888",
    },
    buttonBack: {
      background: "#BFA888",
      color: "#ffffff",
    },
    buttonSkip: {
      background: "#025B70",
      color: "#ffffff",
    },
  };

  const joyrideBeaconStyles = {
    beaconInner: {
      backgroundColor: "red", // Change the inner color of the beacon
    },
    beaconOuter: {
      borderColor: "#BFA888", // Change the outer color of the beacon
      backgroundColor: "#ffffff", // Change the inner color of the beacon
    },
    beacon: {
      borderColor: "#BFA888", // Change the outer color of the beacon
    },
  };

  return (
    <>
      <div className="w-screen h-screen relative">
        {showJoyride && (
          <Joyride
            callback={handleJoyrideCallback}
            run={showJoyride}
            styles={{
              ...joyrideButtonStyles,
              ...joyrideBeaconStyles,
            }}
            steps={[
              {
                target: "body",
                content: <h2>Welcome to the Webcrafter Editor!</h2>,
                placement: "center",
              },
              {
                target: ".panel__top",
                content:
                  "Here's the top panel where you can find basic actions.",
                placement: "bottom",
              },
              {
                target: ".panel__devices",
                content: "You can switch between different devices here.",
                placement: "bottom",
              },
              {
                target: ".panel__switcher",
                content: "Use this to switch between the design and code view.",
                placement: "bottom",
              },
              {
                target: "#layers-container",
                content: "This is where you can manage layers.",
                placement: "right",
              },
              {
                target: "#blocks",
                content:
                  "Drag and drop blocks from here to add to your design.",
                placement: "right",
              },
              {
                target: "#style-manager-container",
                content: "Manage styles for your components here.",
                placement: "left",
              },
              {
                target: "body",
                content: <h2>Enjoy creating amazing Web Pages!</h2>,
                placement: "center",
              },
            ]}
            hideCloseButton
            disableOverlayClose
            showSkipButton
          />
        )}
        <div className="panel__top w-screen relative">
          <div className="panel__basic-actions"></div>

          <div className="panel__devices"></div>
          <div className="panel__switcher"></div>
          {/* Home button with scroll animation */}
          <div className="flex flex-row">
            <Link
              href="/"
              className="bg-gray-800 text-white p-2 rounded-full flex items-center justify-center transition duration-300 hover:bg-gray-700 mr-2"
              onClick={scrollToTop}
            >
              <FaHome className="mr-1" /> Home
            </Link>

            <Link
              href="/workspace"
              className="bg-gray-800 text-white p-2 rounded-full flex items-center justify-center transition duration-300 hover:bg-gray-700"
              onClick={scrollToTop}
            >
              <FaDesktop className="mr-1" /> Workspace
            </Link>
          </div>
        </div>

        {/* GrapesJS editor layout */}
        <div className="row" style={{ minHeight: "100vh" }}>
          <div id="layers" className="column" style={{ flexBasis: "200px" }}>
            Layers
            <div id="layers-container"></div>
          </div>

          <div className="column editor-clm">
            <div id="blocks"></div>
            <div id="gjs2"></div>
          </div>

          <div
            id="style-manager"
            className="column"
            style={{ flexBasis: "500px" }}
          >
            Style Manager
            <br />
            <div id="selectors-container"></div>
            <div id="traits-container"></div>
            <div id="style-manager-container"></div>
          </div>
        </div>
      </div>
    </>
  );
}
