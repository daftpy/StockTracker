from django.contrib.auth.models import User, Group
from django.db.models import Sum
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from stock_tracker.transactions.models import Transaction
from stock_tracker.transactions.serializers import UserSerializer, GroupSerializer, \
    TransactionSerializer, HoldingSerializer

from stock_tracker.transactions.models import Transaction
import pandas as pd


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.AllowAny]


class HoldingsViewSet(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Transaction.objects.all().values()
    serializer_class = HoldingSerializer

    def get(self, request):
        holdings = {}
        transactions = self.get_queryset()
        # put the transactions in a list to load them into the dataframe
        data_frame = pd.DataFrame(list(transactions))
        # groupby and sum the stock quantity and order types
        grouped_data = data_frame.groupby(['ticker', 'order_type'])['stock_quantity'].sum()
        for key, value in grouped_data.to_dict().items():
            try:
                # if the key already exists, add the value
                holdings[key[0]] +=  value if key[1] == 'BUY' else -value
            except:
                # if the key does not exist yet, set the value
                holdings[key[0]] = value if key[1] == 'BUY' else -value
        print(holdings)
        # get the data out of the dataframe and into a list of dictionaries so we can serialize it
        data = [{'ticker': key, 'stock_total': value} for key, value in holdings.items()]
        print(data)
        serializer = self.serializer_class(data, many=True)
        return Response(serializer.data)
