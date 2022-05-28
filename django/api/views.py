from django.shortcuts import render
from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework import permissions

from .models import Recipe
from .serializer import RecipeSerializer


class CharArrayFilter(filters.BaseCSVFilter, filters.CharFilter):
    pass


class RecipeFilter(filters.FilterSet):
    ingredients = CharArrayFilter(field_name="ingredients", lookup_expr="contains")
    ex_ingredients = CharArrayFilter(field_name="ingredients", lookup_expr="contains", exclude=True)
    int_time = filters.RangeFilter(field_name="int_time")

    class Meta:
        model = Recipe
        fields = ["ingredients", "int_time"]


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_superuser


class RecipeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_class = RecipeFilter
