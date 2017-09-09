from django.db import models
from django.contrib.auth.models import AbstractUser

class WordPair(models.Model):
    word1 = models.TextField()
    word2 = models.TextField()
    active = models.BooleanField(default=True)


class UserResponse(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    word1 = models.TextField()
    word2 = models.TextField()
    response_number = models.IntegerField()
    response = models.TextField(blank=True, null=True)
    response_time = models.IntegerField()
    test_phase = models.IntegerField(blank=False, default=1)

    class Meta:
        ordering = ('created',)

class QuestionResponse(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    question_number = models.IntegerField()
    response = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ('created',)

class Timing(models.Model):
    id = models.AutoField(primary_key=True)
    cue_time = models.IntegerField()
    study_time = models.IntegerField()
    test_time_feedback = models.IntegerField()
    feedback_time = models.IntegerField()
    test_time_no_feedback = models.IntegerField()

class Instructions(models.Model):
    id = models.AutoField(primary_key=True)
    instruction_text = models.TextField()
    instruction_num = models.IntegerField()

class User(AbstractUser):
    test_phase = models.IntegerField(blank=False, default=0)

