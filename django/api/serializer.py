from rest_framework import serializers

from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ("name", "url", "date", "ingredients", "favo", "time", "calorie", "int_time")
        read_only_fields = fields
