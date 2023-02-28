// we are making a lab extension which means it is seen on the front end, 
//   as well as a server extension that runs using an API on back end

import {ToolbarButton} from "@jupyterlab/apputils";
import {DocumentRegistry} from "@jupyterlab/docregistry";
import {INotebookModel} from "@jupyterlab/notebook";
import {IDisposable} from "@lumino/disposable";

export class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        // create the toolbar button
        let mybutton = new ToolbarButton({
            label: 'My Button', 
            onClick: () => alert('you did it')
        });
        
        // Add the toolbar button to the notebook
        panel.toolbar.insertItem(10, 'mybutton', mybutton);
        
        // the ToolBarButton class implements 'IDisposable', so the button *is* the extension for the purpose of this method
        return mybutton;
    }
}