from django.contrib.postgres.fields import ArrayField
from django.db import models


class Recipe(models.Model):
    id = models.AutoField(unique=True, primary_key=True)
    name = models.TextField()
    url = models.TextField(unique=True)
    date = models.DateField()
    ingredients = ArrayField(models.TextField(blank=True, null=True), blank=True, null=True)
    favo = models.IntegerField(blank=True, null=True)
    time = models.TextField(blank=True, null=True)
    calorie = models.TextField(blank=True, null=True)
    int_time = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recipes'
