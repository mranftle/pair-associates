from rest_framework import viewsets, permissions, generics, status
from wordpairs.serializers import WordPairSerializer, UserResponseSerializer
from wordpairs.models import WordPair, UserResponse
from rest_framework.response import Response
from permissions import IsOwnerOrReadOnly


class WordPairViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = WordPair.objects.all()
    serializer_class = WordPairSerializer
#
class UserResponseViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = UserResponse.objects.all()
    serializer_class = UserResponseSerializer

    def perform_create(self,serializer):
        serializer.save()

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers=self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
