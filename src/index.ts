import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IDocumentWidget, DocumentWidget, ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel } from '@jupyterlab/notebook';
import { Widget } from '@lumino/widgets';

class CustomNotebookViewer extends Widget {
  constructor(context: DocumentRegistry.IContext<INotebookModel>) {
    super();
    this.addClass('custom-notebook-viewer');
    this.node.innerHTML = '<div style="padding: 20px; font-size: 24px; text-align: center;">Hello World</div>';
  }
}

class CustomNotebookViewerFactory extends ABCWidgetFactory<
  IDocumentWidget<CustomNotebookViewer>,
  INotebookModel
> {
  protected createNewWidget(context: DocumentRegistry.IContext<INotebookModel>): IDocumentWidget<CustomNotebookViewer> {
    const content = new CustomNotebookViewer(context);
    return new DocumentWidget({ content, context });
  }
}

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pep723editor:plugin',
  description: 'A custom notebook viewer extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension pep723editor is activated!');

    const factory = new CustomNotebookViewerFactory({
      name: 'Custom Notebook Viewer',
      fileTypes: ['notebook'],
      defaultFor: [],
      modelName: 'notebook'
    });

    app.docRegistry.addWidgetFactory(factory);
  }
};

export default plugin;
