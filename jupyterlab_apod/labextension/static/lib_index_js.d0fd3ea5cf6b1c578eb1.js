"use strict";
(self["webpackChunkjupyterlab_apod"] = self["webpackChunkjupyterlab_apod"] || []).push([["lib_index_js"],{

/***/ "./lib/button.js":
/*!***********************!*\
  !*** ./lib/button.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonExtension": () => (/* binding */ ButtonExtension)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
// we are making a lab extension which means it is seen on the front end, 
//   as well as a server extension that runs using an API on back end
//import { JupyterFrontEnd } from '@jupyterlab/application';

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
class ButtonExtension {
    createNew(panel, context) {
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
                            'api-key': '417c5d059f2d47aca2bb66c8122083ec'
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
                    background-color: #EEEEEE;
                    
                }
                form {
                    width: 50%;
                    float: left;
                    text-align: center;
                }
                label {
                    text-align: left;
                }
                #debug-btn {
                    text-align: right;
                }
                #output-container {
                    width: 40%;
                    float: right;
                    margin-right: 5%;
                    border-left: 1px solid #ccc;
                    padding-left: 20px;
                }
                .content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }
                label {
                    color: #3A98B9;
                }
            </style>
          </head>
          <body>
            <div class="content">
                <form>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaj9dNpEdibBy5XUs3YcWRiNR8WsO_1J6yl8VJ-rQ&s" alt="cat">
                  <br>
                  <textarea rows="10" cols="50" id="code"></textarea>
                  <br>
                  <label for="code">Input your code snippet</label>
                  <br>
                  <br>
                  <textarea rows="10" cols="50" id="error"></textarea>
                  <br>
                  <label for="error">Ask your question</label>
                  <br>
                  <br>
                  <input type="button" id="debug-btn" value="Debug" onclick="apiCall()">
                </form>
                <div id="output-container">
                    <p id="output"></p>
                </div>
            </div>
          </body>
        </html>`;
        const extensionUrl = URL.createObjectURL(new Blob([extensionHtml], { type: "text/html" }));
        let mybutton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
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


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./lib/button.js");
// import {
//   ILayoutRestorer,
//   JupyterFrontEnd,
//   JupyterFrontEndPlugin
// } from '@jupyterlab/application';
//import {ToolbarButton} from "@jupyterlab/apputils";
//import {INotebookModel, NotebookPanel} from "@jupyterlab/notebook"; // cur
//import { NotebookActions } from '@jupyterlab/notebook';
//import { Notebook } from '@jupyterlab/notebook';
//import { DocumentRegistry } from '@jupyterlab/docregistry'; //cur

/**
 * Initialization data for the mybutton extension.
 */
const extension = {
    id: 'mybutton',
    autoStart: true,
    activate: (app) => {
        console.log('JupyterLab extension mybutton is activated!');
        let buttonExtension = new _button__WEBPACK_IMPORTED_MODULE_0__.ButtonExtension();
        app.docRegistry.addWidgetExtension('Notebook', buttonExtension);
    }
};
// const extension: JupyterFrontEndPlugin<void> = {
//     id: 'mybutton',
//     autoStart: true,
//     activate: (app: JupyterFrontEnd) => {
//         console.log('JupyterLab extension mybutton is activated!');
//         app.docRegistry.addWidgetExtension('Notebook', {
//             createNew: (panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) => {
//                 // let buttonExtension = new ButtonExtension(panel); 
//                 // panel.toolbar.addItem('myButton', buttonExtension.toolbarButton);
//                 var button = new ButtonExtension(panel);
//                
//             }
//         });
//     }
// };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.d0fd3ea5cf6b1c578eb1.js.map