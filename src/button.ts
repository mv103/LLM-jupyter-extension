// we are making a lab extension which means it is seen on the front end, 
//   as well as a server extension that runs using an API on back end

// import {ToolbarButton} from "@jupyterlab/apputils";
 import {DocumentRegistry} from "@jupyterlab/docregistry"; 
 import {INotebookModel, NotebookPanel} from "@jupyterlab/notebook";
// import { NotebookActions } from '@jupyterlab/notebook';
 import {IDisposable} from "@lumino/disposable";

//import { JupyterFrontEnd } from '@jupyterlab/application';
import { ToolbarButton } from '@jupyterlab/apputils';
//import { NotebookActions } from '@jupyterlab/notebook'; // cur
//import { Cell } from '@jupyterlab/cells';
//import { ICellModel } from '@jupyterlab/cells/lib/model';
//import { Widget } from '@lumino/widgets';
//import { IWidgetExtension } from '@jupyterlab/nbformat';
//import { NotebookActions, Notebook } from '@jupyterlab/notebook';

// export class ButtonExtension implements IWidgetExtension<Widget, ICellModel> {
// current sol
// export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    
//   private notebook: NotebookPanel;

//   constructor(notebook: NotebookPanel) {
//     console.log("initialize ButtonExtension called");
//     this.notebook = notebook;
//   }

//   createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable { // change idispos to tool
      
//     console.log("createNew called");
//     let mybutton = new ToolbarButton({
//       label: 'My Button',
        
//       onClick: () =>  {
//         console.log("createNew func is called");
//         console.log(NotebookPanel);
//         console.log(NotebookActions);
//         console.log(this.notebook);
//         // NotebookActions.insertBelow(this.notebook.content);
//         // NotebookActions.selectBelow(cell);
//       }
//       // tooltip: 'Insert new cell below'
//     });
      
//     // Add the toolbar button to the notebook
//     panel.toolbar.addItem('mybutton', mybutton);
//     console.log("added to tollbar");
      
//     return mybutton;
//   }
// }

// yt sol
export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        const extensionHtml = `<!DOCTYPE html>
        <html>
          <head>
            <script>
                async function apiCall() {
                    // this is to take input as the prompt (from "error")
                    let userQuestion = document.getElementById('error');
                    let promptInput = userQuestion.value;
                    
                    const body = {
                        'prompt': promptInput,
                        'max_tokens': 500,
                        'temperature': 1,
                        'frequency_penalty': 0,
                        'presence_penalty': 0,
                        'top_p': 0.5,
                        'stop': null
                    };
                    const response = await fetch('https://inferenceendpointeastus.openai.azure.com/openai/deployments/athena-code-davinci-002/completions?api-version=2022-06-01-preview', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // use different key, API key hidden and rotated
                            'api-key': ''
                        },
                        body: JSON.stringify(body)
                    }).then(response => response.json());
                    
                    console.log(body.prompt)
                    console.log(response.choices[0])
                    console.log(response.choices[0].text)
                    
                    
                    // this is to output the prompt response
                    let outputText = document.getElementById('output');
                    outputText.innerHTML = response.choices[0].text;
                }
            </script>
            <style>
                body {
                  background-color: #F5F5F5;
                  font-family: "Share Tech Mono", monospace;
                  font-size: 15pt;
                }
                h1 {
                  color: #3C91E6;
                }
                /* typing effect style and animation */
                .typing-container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .input-cursor {
                  display: inline-block;
                  width: 2px;
                  height: 42px;
                  background-color: #3C91E6;
                  margin-left: 8px;
                }
                /* animation */
                @keyframes blink {
                  0% {opacity: 1;}
                  40% {opacity: 1;}
                  60% {opacity: 0;}
                  100% {opacity: 0;}
                }
                /* Then, inside .input-cursor: */
                .input-cursor {
                animation: blink .6s linear infinite alternate;
                }

                /* form input styling */
                form {
                  width: 50%;
                  float: left;
                  text-align: center;
                }
                label {
                  text-align: left;
                  margin: 15px;
                  font-size: 20pt;
                }
                textarea {
                  margin: 25px;
                }
                #debug-btn {
                  text-align: right;
                  padding: 5px 25px;
                  display: inline-block;
                  border-radius: 15px;
                  font-family: "Share Tech Mono", monospace;
                  background-color: #3C91E6;
                  font-size: 20px;
                  margin: 4px 2px;
                }
                #debug-btn:hover {
                  border-style: solid;
                  border-color: #7180AC;
                  background-color: #F5F5F5;
                }
                #output-container {
                  width: 40%;
                  float: right;
                  margin-right: 5%;
                  border-left: 1px solid #ccc;
                  padding-left: 20px;
                }
                .tab {
                  display: inline-block;
                  margin-left: 40px;
                }
                .err-type {
                  color:#BF5B2A;
                }
                .code{
                  color: #BF5B2A;
                }
                .content {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  height: 70vh;
                }
                label {
                  color: #3C91E6;
                }
            </style>
          </head>
           <body>
            <div class="typing-container">
              <h1>Welcome to Buggy</h1>
              <span class="input-cursor"></span>
            </div>
            <div class="content">
              <form>
                <!-- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaj9dNpEdibBy5XUs3YcWRiNR8WsO_1J6yl8VJ-rQ&s" alt="cat"> -->
                <br>
                <label for="error">Ask your question</label>
                <br>
                <textarea rows="20" cols="70" id="error"></textarea>
                <br>
                <br>
                <input type="button" id="debug-btn" value="Debug" onclick="apiCall()">
              </form>
              <div id="output-container">
                  <p id="output"></p>
              </div>
            </div>
            <footer>
              <p>
                &copy;2023 HCDE 496
              </p>
            </footer>
         </body>
        </html>`;

    const extensionUrl = URL.createObjectURL(
    new Blob([extensionHtml], { type: "text/html" }));
   
    let mybutton = new ToolbarButton({
        label: 'LLM Buggy',
        onClick: () => window.open(extensionUrl, "win", "width=500,height=500"), 
        tooltip: 'Open LLM Buggy Extension'
    });

//       // create the toolbar button
//         let mybutton = new ToolbarButton({
//             label: 'My Button', 
//             onClick: () => alert('you did it')
//                 // Get the current active notebook widget
//                 // let notebook = app.shell.currentWidget?.content;

//                 // Create a new code cell and select it
//                 // NotebookActions.insertBelow(notebook);
//                 // NotebookActions.selectBelow(notebook);
//         });
        
        // Add the toolbar button to the notebook
        panel.toolbar.insertItem(9, 'mybutton', mybutton);
        
        // the ToolBarButton class implements 'IDisposable', so the button *is* the extension for the purpose of this method
        return mybutton;
   }
}

//another chat sol
// export function createButton(app: JupyterFrontEnd): ToolbarButton {
//   let button = new ToolbarButton({
//     iconClassName: 'fa fa-plus-square',
//     onClick: () => {
//       // Get the current active notebook widget
//       let notebook = app.shell.currentWidget?.content;

//       // Create a new code cell and select it
//       NotebookActions.insertBelow(notebook);
//       NotebookActions.selectBelow(notebook);
//     },
//     tooltip: 'Insert new cell below'
//   });
//   return button;
