from jupyter_server.extension.application import ExtensionApp
from jupyter_server.extension.handler import ExtensionHandlerMixin
from .handlers import setup_handlers


class Pep723EditorExtension(ExtensionApp):
    """Server extension for PEP 723 Editor."""
    
    name = "pep723editor"
    
    def initialize_handlers(self):
        """Initialize the handlers for the server extension."""
        setup_handlers(self.handlers)
    
    def initialize_settings(self):
        """Initialize settings for the server extension."""
        self.log.info("PEP 723 Editor server extension initialized")


# For backward compatibility with jupyter_server < 2.0
def load_jupyter_server_extension(server_app):
    """Load the server extension (legacy)."""
    extension = Pep723EditorExtension()
    extension.initialize(server_app)


# For jupyter_server >= 2.0
def _jupyter_server_extension_points():
    """Return the extension points for jupyter_server."""
    return [
        {
            "module": "pep723editor.extension",
            "app": Pep723EditorExtension,
        }
    ]