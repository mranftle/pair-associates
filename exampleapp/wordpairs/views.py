from rest_framework import viewsets
from wordpairs.serializers import WordPairSerializer
from wordpairs.models import WordPair


class WordPairViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = WordPair.objects.all()
    serializer_class = WordPairSerializer

