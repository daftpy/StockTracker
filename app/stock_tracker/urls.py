from django.urls import include, path
from rest_framework import routers
from stock_tracker.transactions import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'transactions', views.TransactionViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('holdings/', views.HoldingsViewSet.as_view()),
    path('daily_price/<str:ticker>/', views.DailyPriceDataView.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
