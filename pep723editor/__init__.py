try:
    from ._version import __version__
except ImportError:
    # Fallback when using the package in dev mode without installing
    # in editable mode with pip. It is highly recommended to install
    # the package from a stable release or in editable mode: https://pip.pypa.io/en/stable/topics/local-project-installs/#editable-installs
    import warnings
    warnings.warn("Importing 'pep723editor' outside a proper installation.")
    __version__ = "dev"


def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "pep723editor"
    }]


def _jupyter_server_extension_points():
    """Return the extension points for jupyter_server."""
    return [
        {
            "module": "pep723editor.extension",
            "app": "Pep723EditorExtension",
        }
    ]
