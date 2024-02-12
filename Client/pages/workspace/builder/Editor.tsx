import { useEffect } from "react";
import grapesjs from "grapesjs";
import editorSettings from "../../../helper/editor";
import axios from "axios";
export default function Editor({id}) {
  useEffect(() => {
    // @ts-ignore
    const editor = grapesjs.init(editorSettings );
    editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
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
        
            // Clear local storage
            localStorage.clear();
          } catch (error) {
            console.error("Error loading content:", error);
          }
        });
    
    


    editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        {
          id: 'visibility',
          active: true, // active by default
          className: 'btn-toggle-borders',
          label: '<u>B</u>',
          command: 'sw-visibility', // Built-in command
        }, {
          id: 'export',
          className: 'btn-open-export',
          label: '<>',
          command: 'export-template',
          context: 'export-template', // For grouping context of buttons from the same panel
        }, {
          id: 'show-json',
          className: 'btn-show-json',
          label: 'JSON',
          context: 'show-json',
          command(editor) {
            editor.Modal.setTitle('Components JSON')
              .setContent(`<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`)
              .open();
          },
        }
      ],
    });
    editor.Commands.add('set-device-desktop', {
    // @ts-ignore

      run: editor => editor.setDevice('Desktop')
    });
    editor.Commands.add('set-device-mobile', {
    // @ts-ignore
      
      run: editor => editor.setDevice('Mobile')
    });

    // destroy on exit
    return () => {
      editor.destroy();
    };
  });
  return (
    <>

    <div className="w-screen flex items-center justify-center">


    <div className="panel__top w-screen">
    <div className="panel__basic-actions"></div>

    <div className="panel__devices"></div>
    <div className="panel__switcher"></div>
    </div>
    </div>
   
    <div className="row" style={{ minHeight: "100svh" }}>
      
      <div id="layers" className="column" style={{ flexBasis: "200px" }}>
        Layers
        <div id="layers-container"></div>
      </div>

    <div className="column editor-clm">
        <div id="blocks"></div>
        <div id="gjs2"></div>
      </div>

      <div id="style-manager" className="column" style={{ flexBasis: "500px" }}>
        Style Manager
        <br />
        <div id="selectors-container"></div>
        <div id="traits-container"></div>
        <div id="style-manager-container"></div>
      </div>
    </div>
    </>

  );
}
