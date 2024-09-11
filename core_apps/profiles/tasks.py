from uuid import UUID
from celery import shared_task
from celery.exceptions import MaxRetriesExceededError
from .models import Profile
import cloudinary.uploader
import logging

# Set up logger
logger = logging.getLogger(__name__)


@shared_task(name='upload_avatar_to_cloudinary', bind=True, max_retries=3)
def upload_avatar_to_cloudinary(self, profile_id: UUID, image_content: bytes) -> None:
    try:
        profile = Profile.objects.get(id=profile_id)
        response = cloudinary.uploader.upload(image_content)
        profile.avatar = response['url']
        profile.save()
    except Exception as exc:
        logger.error(f"Error uploading avatar for profile {profile_id}: {exc}")
        # Retry task if an exception occurs
        try:
            self.retry(exc=exc, countdown=60)  # Retry after 60 seconds
        except MaxRetriesExceededError:
            logger.error(
                f"Max retries exceeded for uploading avatar for profile {profile_id}"
            )


@shared_task(name='update_all_reputations', bind=True)
def update_all_reputations(self):
    try:
        # Process in batches if the dataset is large to avoid memory issues
        profiles = Profile.objects.all()
        for profile in profiles:
            profile.update_reputation()
            profile.save()
        logger.info("Successfully updated all reputations.")
    except Exception as exc:
        logger.error(f"Error updating reputations: {exc}")
        # Optionally, retry this task if the failure is recoverable
        self.retry(exc=exc, countdown=300)  # Retry after 5 minutes
