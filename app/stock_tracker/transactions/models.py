from django.db import models

ORDER_CHOICES = [('BUY', 'Buy'), ('SELL', 'Sell')]

# Create your models here.
class Transaction(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    ticker = models.CharField(max_length=6)
    stock_quantity = models.IntegerField()
    avg_cost = models.FloatField()
    trade_date = models.DateField()
    order_type = models.CharField(choices=ORDER_CHOICES, max_length=255)
