from django.db import models


class WordPair(models.Model):
    word1 = models.TextField()
    word2 = models.TextField()

class UserResponse(models.Model):
    id= models.IntegerField(auto_created=True, primary_key=True)
    user_name= models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    word1 = models.TextField()
    word2 = models.TextField()
    response_number = models.IntegerField()
    response = models.TextField()
    response_time = models.IntegerField()

    class Meta:
        ordering = ('created',)


