import cloudinary
import cloudinary.uploader
import cloudinary.api
from typing import BinaryIO, Dict, Any
from app.infrastructure.config.settings import settings


class CloudinaryService:
    """Service for handling Cloudinary operations"""

    def __init__(self):
        # Configure Cloudinary
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
            secure=True,
        )

    async def upload_image(
        self, file: BinaryIO, filename: str, folder: str = "photos"
    ) -> Dict[str, Any]:
        """
        Upload an image to Cloudinary

        Args:
            file: Binary file object
            filename: Original filename
            folder: Cloudinary folder path

        Returns:
            Dict with upload response including url, public_id, etc.
        """
        try:
            # Upload the image
            response = cloudinary.uploader.upload(
                file,
                folder=folder,
                resource_type="image",
                transformation=[
                    {"quality": "auto:good"},
                    {"fetch_format": "auto"},
                ],
                # Generate thumbnail
                eager=[
                    {
                        "width": 400,
                        "height": 400,
                        "crop": "fill",
                        "gravity": "auto",
                        "quality": "auto:good",
                    }
                ],
                eager_async=False,
            )

            # Extract relevant data
            result = {
                "url": response.get("secure_url"),
                "public_id": response.get("public_id"),
                "thumbnail_url": (
                    response.get("eager", [{}])[0].get("secure_url")
                    if response.get("eager")
                    else None
                ),
                "width": response.get("width"),
                "height": response.get("height"),
                "format": response.get("format"),
                "bytes": response.get("bytes"),
                "resource_type": response.get("resource_type"),
            }

            return result

        except Exception as e:
            raise Exception(f"Failed to upload image to Cloudinary: {str(e)}")

    async def delete_image(self, public_id: str) -> Dict[str, Any]:
        """
        Delete an image from Cloudinary

        Args:
            public_id: Cloudinary public ID of the image

        Returns:
            Dict with deletion response
        """
        try:
            response = cloudinary.uploader.destroy(public_id, resource_type="image")
            return response
        except Exception as e:
            raise Exception(f"Failed to delete image from Cloudinary: {str(e)}")

    async def get_image_details(self, public_id: str) -> Dict[str, Any]:
        """
        Get details of an image from Cloudinary

        Args:
            public_id: Cloudinary public ID of the image

        Returns:
            Dict with image details
        """
        try:
            response = cloudinary.api.resource(public_id, resource_type="image")
            return response
        except Exception as e:
            raise Exception(f"Failed to get image details from Cloudinary: {str(e)}")

    async def delete_folder(self, folder_path: str) -> Dict[str, Any]:
        """
        Delete a folder from Cloudinary (useful when deleting an album)

        Args:
            folder_path: Path to the folder

        Returns:
            Dict with deletion response
        """
        try:
            # Delete all resources in the folder
            response = cloudinary.api.delete_resources_by_prefix(
                folder_path, resource_type="image"
            )
            # Delete the folder
            cloudinary.api.delete_folder(folder_path)
            return response
        except Exception as e:
            raise Exception(f"Failed to delete folder from Cloudinary: {str(e)}")

    def generate_transformation_url(
        self, public_id: str, width: int = None, height: int = None, crop: str = "fill"
    ) -> str:
        """
        Generate a transformed image URL

        Args:
            public_id: Cloudinary public ID
            width: Desired width
            height: Desired height
            crop: Crop mode

        Returns:
            Transformed image URL
        """
        transformation = {}
        if width:
            transformation["width"] = width
        if height:
            transformation["height"] = height
        if crop:
            transformation["crop"] = crop

        url = cloudinary.CloudinaryImage(public_id).build_url(**transformation)
        return url
