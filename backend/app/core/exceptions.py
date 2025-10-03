class UserNotFoundError(Exception):
    """Raised when a user is not found in the database."""

class UserAlreadyExistsError(Exception):
    """Raised when trying to register a user with an existing email."""

class DatabaseError(Exception):
    """Raised when a database operation fails."""
