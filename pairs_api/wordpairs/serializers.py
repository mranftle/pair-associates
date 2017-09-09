from wordpairs.models import WordPair, UserResponse, QuestionResponse, Timing, Instructions, User
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

class InstructionsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Instructions
        fields = ('id', 'instruction_text', 'instruction_num')

class TimingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Timing
        fields = ('id', 'cue_time', 'study_time', 'test_time_feedback', 'feedback_time', 'test_time_no_feedback')
