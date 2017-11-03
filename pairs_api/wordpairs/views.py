import json
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import detail_route
from wordpairs.serializers import WordPairSerializer, UserResponseSerializer, QuestionResponseSerializer, TimingSerializer, UserSerializer
from wordpairs.models import WordPair, UserResponse, QuestionResponse, Timing, User
from rest_framework.response import Response


class WordPairViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = WordPair.objects.filter(active=True)
    serializer_class = WordPairSerializer

class UserResponseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserResponse.objects.all()
    serializer_class = UserResponseSerializer

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = int(request.user.id)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserResponse.objects.create(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad Request',
            'message': 'Response could not be created with received data'
        }, status=status.HTTP_400_BAD_REQUEST)

class QuestionResponseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = QuestionResponse.objects.all()
    serializer_class = QuestionResponseSerializer

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = int(request.user.id)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            QuestionResponse.objects.create(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad Request',
            'message': 'Response could not be created with received data'
        }, status=status.HTTP_400_BAD_REQUEST)

class TimingViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Timing.objects.filter(id=1)
    serializer_class = TimingSerializer

class UserViewSet(viewsets.ModelViewSet):

    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    def list(self, request):
        print request.user
        queryset = User.objects.filter(username=request.user)
        print queryset
        payload = {"id": queryset.values()[0]['id'],
                   "test_phase": queryset.values()[0]['test_phase'],
                   "is_morning": queryset.values()[0]['is_morning'],
                   "last_login": queryset.values()[0]['last_login']}
        return Response(payload, status=status.HTTP_200_OK)

    @detail_route(methods=['post'])
    def set_test_phase(self, request, pk=None):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        is_test = body['test_phase']
        User.objects.filter(id=pk).update(test_phase=is_test)
        return Response({
            'status': 'User updated',
            'message': 'Test phase set to ' + str(is_test)
        }, status=status.HTTP_200_OK)

    @detail_route(methods=['post'])
    def set_is_morning(self, request, pk=None):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        is_morning = body['is_morning']
        last_login = body['last_login']
        User.objects.filter(id=pk).update(is_morning=is_morning,
                                          last_login=last_login)
        return Response({
            'status': 'User updated',
            'message': 'is_morning set to ' + str(is_morning) +
                        ' last_login set to ' + str(last_login)
        }, status=status.HTTP_200_OK)