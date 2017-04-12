from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

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


class Participant(models.Model):
    user = models.OneToOneField(User)
    is_test = models.BooleanField(blank=False, default=False)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Participant.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.participant.save()
