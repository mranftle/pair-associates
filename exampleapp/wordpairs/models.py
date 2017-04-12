from django.db import models
from django.contrib.auth.models import AbstractUser

class WordPair(models.Model):
    word1 = models.TextField()
    word2 = models.TextField()

class UserResponse(models.Model):
    id= models.IntegerField(auto_created=True, primary_key=True)
    username= models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    word1 = models.TextField()
    word2 = models.TextField()
    response_number = models.IntegerField()
    response = models.TextField()
    response_time = models.IntegerField()

    class Meta:
        ordering = ('created',)

class User(AbstractUser):
    is_test = models.BooleanField(blank=False, default=False)

