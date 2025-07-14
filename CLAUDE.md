# JupyterLab Notebook Viewer Extension Development Guide

## Project Overview

This project creates an alternate viewer/editor for `.ipynb` (Jupyter notebook) files within JupyterLab. It appears in the "Open With..." context menu when right-clicking notebook files.

## Template Source

This extension was scaffolded using the official JupyterLab extension template:
- **Repository**: https://github.com/jupyterlab/extension-template
- **Template System**: Copier (replaced the deprecated cookiecutter approach)
- **JupyterLab Version**: Targets JupyterLab 4.x

## Key Architecture Concepts

### DocumentWidget + NotebookModel Pattern

The correct approach for creating alternate notebook viewers uses:
- **DocumentWidget**: Container that wraps content widgets with toolbar and context management
- **NotebookModel**: Implements IModel interface, represents notebook data with cells, metadata, and collaborative editing support
- **Document Registry**: Manages file types, model factories, and widget factories

### How It Works

1. **Widget Factory Registration**: When you register a widget factory for the 'notebook' file type, JupyterLab automatically adds it to the "Open With..." menu
2. **Model Sharing**: Multiple widgets can share the same NotebookModel instance, enabling synchronized views
3. **Context Bridge**: DocumentRegistry.IContext bridges the model and file system operations

## Development Workflow

### Initial Setup (One Time)
```bash
# Install in development mode
pip install -e "."

# Install JavaScript dependencies
jlpm install
```

### Development Cycle
```bash
# Terminal 1: Watch for changes
jlpm run watch

# Terminal 2: Run JupyterLab
jupyter lab
```

### Building for Production
```bash
# Build the extension
jlpm run build

# Build Python package
python -m build
```

## Project Structure

```
my-notebook-viewer/
├── src/
│   ├── index.ts          # Main plugin entry point
│   ├── widget.ts         # Custom widget implementation (to be created)
│   └── model.ts          # Custom model if needed (optional)
├── style/
│   ├── index.css         # Extension styles
│   └── base.css          # Base styles
├── package.json          # NPM dependencies and scripts
├── pyproject.toml        # Python packaging configuration
├── tsconfig.json         # TypeScript configuration
└── install.json          # Extension metadata
```

## Key Dependencies

The template includes these JupyterLab 4.x packages:
- `@jupyterlab/application`: Core application interfaces
- `@jupyterlab/docregistry`: Document registry for widget factories
- `@jupyterlab/notebook`: NotebookModel and notebook-specific interfaces
- `@jupyterlab/apputils`: UI utilities
- `@lumino/widgets`: Base widget classes

## Implementation Pattern

```typescript
// Basic pattern for a notebook viewer
class CustomNotebookViewer extends Widget {
  constructor(context: DocumentRegistry.IContext<INotebookModel>) {
    super();
    // Access notebook model via context.model
    // Subscribe to model changes
    // Build your custom UI
  }
}

// Factory to create the viewer
class CustomNotebookViewerFactory extends ABCWidgetFactory<
  IDocumentWidget<CustomNotebookViewer>,
  INotebookModel
> {
  protected createNewWidget(
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDocumentWidget<CustomNotebookViewer> {
    const content = new CustomNotebookViewer(context);
    return new DocumentWidget({ content, context });
  }
}
```

## Real-World Examples

Several production extensions demonstrate this pattern:
- **nbdime**: Creates diff viewers for notebooks
- **jupyterlab-git**: Provides Git integration with custom diff views
- Both use DocumentWidget + NotebookModel architecture

## Testing

```bash
# Run tests
jlpm run test

# Run tests in watch mode
jlpm run test:watch
```

## Packaging and Distribution

The extension uses:
- **Build Backend**: hatchling
- **Distribution**: Can be published to PyPI and npm
- **Prebuilt**: Extensions are distributed as prebuilt (no compilation needed on install)

## Important Notes

1. **Automatic Menu Integration**: The "Open With..." menu is automatically populated - no manual menu configuration needed
2. **Model Reuse**: The same NotebookModel instance is shared between viewers
3. **Collaborative Editing**: Compatible with JupyterLab's real-time collaboration features
4. **Memory Management**: Implement proper disposal methods to prevent memory leaks

## Resources

- [JupyterLab Extension Tutorial](https://jupyterlab.readthedocs.io/en/stable/extension/extension_tutorial.html)
- [Document Registry Documentation](https://jupyterlab.readthedocs.io/en/stable/extension/documents.html)
- [Notebook Extension Points](https://jupyterlab.readthedocs.io/en/stable/extension/notebook.html)
- [Extension Examples Repository](https://github.com/jupyterlab/extension-examples)