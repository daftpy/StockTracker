from django.contrib.auth.models import User, Group
from stock_tracker.transactions.models import Transaction
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'ticker', 'stock_quantity', 'avg_cost', 'trade_date', 'order_type']


class HoldingSerializer(serializers.Serializer):
    ticker = serializers.CharField(read_only=True)
    stock_total = serializers.FloatField(read_only=True)
    value = serializers.FloatField(read_only=True)
