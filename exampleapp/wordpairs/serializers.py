from wordpairs.models import WordPair
from rest_framework import serializers


class WordPairSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WordPair
        fields = ('url', 'word1', 'word2')
