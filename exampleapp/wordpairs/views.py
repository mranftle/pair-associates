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
    queryset = WordPair.objects.all()
    serializer_class = WordPairSerializer
#
class UserResponseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserResponse.objects.all()
    serializer_class = UserResponseSerializer

    def perform_create(self,serializer):
        serializer.save(owner=self.request.participant)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers=self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):

    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    def list(self, request):
        queryset = User.objects.filter(username=request.user)
        payload = {"id": queryset.values()[0]['id'], "is_test": queryset.values()[0]['is_test']}
        return Response(payload, status=status.HTTP_200_OK)

    @detail_route(methods=['post'])
    def set_is_test(self, request, pk=None):
        print 'hi'
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        is_test = body['is_test']
        print is_test
        User.objects.filter(id=pk).update(is_test=is_test)
        return Response(status=status.HTTP_200_OK)
