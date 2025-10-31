class DomainException(Exception):
    """Base exception for domain layer"""

    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)


class EntityNotFoundException(DomainException):
    """Raised when an entity is not found"""
    pass


class EntityAlreadyExistsException(DomainException):
    """Raised when trying to create an entity that already exists"""
    pass


class ValidationException(DomainException):
    """Raised when validation fails"""
    pass
