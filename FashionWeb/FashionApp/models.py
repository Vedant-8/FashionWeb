from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser



class Customer(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)  # Storing password securely is essential, consider hashing.
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    gender_choices = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    gender = models.CharField(max_length=6, choices=gender_choices)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)  # Hashing the password
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username




class Product(models.Model):
    article_id = models.IntegerField(primary_key=True)
    product_code = models.CharField(max_length=100)
    prod_name = models.CharField(max_length=500)
    product_type_no = models.IntegerField()
    product_type_name = models.CharField(max_length=500)
    product_group_name = models.CharField(max_length=500)
    graphical_appearance_no = models.IntegerField()
    graphical_appearance_name = models.CharField(max_length=500)
    colour_group_code = models.IntegerField()
    colour_group_name = models.CharField(max_length=500)
    perceived_colour_value_id = models.IntegerField()
    perceived_colour_value_name = models.CharField(max_length=500)
    perceived_colour_master_id = models.IntegerField()
    perceived_colour_master_name = models.CharField(max_length=500)
    department_no = models.IntegerField()
    department_name = models.CharField(max_length=500)
    index_code = models.CharField(max_length=100)
    index_name = models.CharField(max_length=500)
    index_group_no = models.IntegerField()
    index_group_name = models.CharField(max_length=500)
    section_no = models.IntegerField()
    section_name = models.CharField(max_length=500)
    garment_group_no = models.IntegerField()
    garment_group_name = models.CharField(max_length=500)
    detail_desc = models.TextField()

    def __str__(self):
        return self.prod_name
    

class WishlistItem(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='wishlist_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.customer.username}'s wishlist: {self.product.prod_name}"

class BoughtItem(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='bought_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.customer.username}'s bought items: {self.product.prod_name}"