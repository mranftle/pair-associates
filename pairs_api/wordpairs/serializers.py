from wordpairs.models import WordPair, UserResponse, User
from rest_framework import serializers

class UserResponseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserResponse
        fields=('id','user_id','word1','word2','response_number', 'response', 'response_time');

class WordPairSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WordPair
        fields = ('word1', 'word2')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'username', 'is_test')
