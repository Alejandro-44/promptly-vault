class UserNotFoundError(Exception):
    """Raised when a user is not found in the database"""

class UserAlreadyExistsError(Exception):
    """Raised when trying to register a user with an existing email"""

class DatabaseError(Exception):
    """Raised when a database operation fails"""

class UnauthorizedError(Exception):
    """Raised when user fails in its authentication"""

class EmailNotRegisteredError(Exception):
    """Raised when trying to login an unregistered user"""

class WrongPasswordError(Exception):
    """Raised when put incorrect password to change it"""

class PromptNotFoundError(Exception):
    """Raised when a prompt is not found in the database"""

