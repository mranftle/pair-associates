"""exampleapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework import routers
from wordpairs import views

router = routers.DefaultRouter()
router.register(r'wordpairs', views.WordPairViewSet, 'word-pair')
router.register(r'istest', views.UserViewSet, 'istest')
router.register(r'userresponse', views.UserResponseViewSet, 'userresponse')
router.register(r'questionresponse', views.QuestionResponseViewSet, 'questionresponse')
router.register(r'timing', views.TimingViewSet, 'timing')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-token-auth/', obtain_jwt_token)
]
