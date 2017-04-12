from rest_framework import viewsets, permissions, status
from wordpairs.serializers import WordPairSerializer, UserResponseSerializer
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

    def list(self, response):
        def list(self, request):
            print request.user.id
            queryset = Participant.objects.filter(user_id=request.user.id)
            return Response(queryset.values()[0]['is_test'], status=status.HTTP_200_OK)
