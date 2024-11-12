from rest_framework import serializers
from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    rated_user__username = serializers.CharField(write_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'rated_user__username', 'rating', 'comment']
        read_only_fields = ['id']

    def create(self, validated_data) -> Rating:
        validated_data.pop('rated_user__username')
        rating = Rating.objects.create(**validated_data)
        return rating
