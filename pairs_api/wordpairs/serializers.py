from wordpairs.models import WordPair, UserResponse, QuestionResponse, User
from rest_framework import serializers

class UserResponseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserResponse
        fields = ('id','user_id','word1','word2','response_number', 'response', 'response_time', 'test_phase')

class WordPairSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WordPair
        fields = ('word1', 'word2', 'active')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'username', 'is_test')

class QuestionResponseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = QuestionResponse
        fields = ('id', 'user_id', 'question_number', 'response')