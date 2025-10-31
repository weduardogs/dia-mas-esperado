"""
Singleton instances and factory functions for repositories
This file handles dependency injection for the application
"""

from app.infrastructure.external_services.cloudinary_service import CloudinaryService

# Cloudinary service singleton (stateless, can be shared)
cloudinary_service = CloudinaryService()

# Note: Database repositories are created per-request via dependency injection
# See app/api/v1/dependencies/database.py for repository creation
