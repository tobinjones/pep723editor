import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the pep723editor extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'pep723editor:plugin',
  description: 'A JupyterLab extension to edit PEP723 inline script metadata in notebooks.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension pep723editor is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('pep723editor settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for pep723editor.', reason);
        });
    }
  }
};

export default plugin;
