from django import forms
from .models import Customer

class SignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Customer
        fields = ['username', 'password', 'email', 'age', 'gender']