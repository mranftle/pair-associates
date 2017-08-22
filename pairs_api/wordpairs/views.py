import json
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import detail_route
from wordpairs.serializers import WordPairSerializer, UserResponseSerializer, UserSerializer
from wordpairs.models import WordPair, UserResponse, User
from rest_framework.response import Response


class WordPairViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = WordPair.objects.filter(active=True)
    serializer_class = WordPairSerializer
#
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

class UserViewSet(viewsets.ModelViewSet):

    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    def list(self, request):
        queryset = User.objects.filter(username=request.user)
        payload = {"id": queryset.values()[0]['id'], "test_phase": queryset.values()[0]['test_phase']}
        return Response(payload, status=status.HTTP_200_OK)

    @detail_route(methods=['post'])
    def set_is_test(self, request, pk=None):
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        is_test = body['test_phase']
        User.objects.filter(id=pk).update(test_phase=is_test)
        return Response(status=status.HTTP_200_OK)
