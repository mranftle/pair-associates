from wordpairs.models import WordPair, UserResponse, Participant
from django.contrib.auth.models import User
from rest_framework import serializers

class UserResponseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserResponse
        fields=('user_name', 'word1', 'word2', 'response_number', 'response','response_time')

    def create(self, validated_data):
            print UserResponse(**validated_data).response
            return UserResponse(**validated_data)


class WordPairSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WordPair
        fields = ('word1', 'word2')

class ParticipantSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password')
    is_test = serializers.BooleanField()

    class Meta:
        model = Participant
        fields = ('id', 'username', 'password', 'is_test')


        def restore_object(self, attrs, instance):
            if instance is not None:
                # update test status
                instance.participant.is_test = attrs.get('participant.is_test', \
                                                         instance.participant.is_test)

            p = Participant.objects.create_user(username=attrs.get('participant.username'), \
                                         password=attrs.get('participant.password'),
                                         is_test=False)
            return Participant(p)
