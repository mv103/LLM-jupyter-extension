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
import { ButtonExtension } from "./button";
/**
 * Initialization data for the mybutton extension.
 */
const extension = {
    id: 'mybutton',
    autoStart: true,
    activate: (app) => {
        console.log('JupyterLab extension mybutton is activated!');
        let buttonExtension = new ButtonExtension();
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
export default extension;
//# sourceMappingURL=index.js.map