from django.db import models


class WordPair(models.Model):
    word1 = models.TextField()
    word2 = models.TextField()