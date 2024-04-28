from django.urls import path
from .views import (
    LoginPage,
    SignUpPage,
    ArticleDetails,
    FilterArticleListView,
    logout_view,
    home
)
urlpatterns = [
    path('login/', LoginPage.as_view(), name='login'),
    path('signup/', SignUpPage.as_view(), name='signup'),
    path('article/', ArticleDetails.as_view(), name='article_details'),
    path('filter-articles/', FilterArticleListView.as_view(), name='filter_articles'),
    path('logout/', logout_view, name='logout'),
    path('', home, name='home'),
]