from django.shortcuts import render,redirect
from FashionApp.models import Product
from .forms import SignUpForm
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import SignUpForm
from .models import Customer
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import logout
from django.shortcuts import redirect
from .decoraters import unauth_user
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
# # Create your views here.
# # Usage:
# csv_file_path = "D:\\Omkar\\productsfile.csv"
# # add_products_from_csv(csv_file_path)


# @unauth_user
# def signup(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             # Save the Customer
#             customer = form.save(commit=False)

#             # Take password from the Customer object
#             password = customer.password
#             customer.save()

#             # Create a corresponding User
#             user = User.objects.create_user(username=customer.username,
#                                             email=customer.email,
#                                             password=password)

#             # Link User to Customer
#             customer.user = user
#             customer.save()

#             return redirect('home')  # Redirect to a success page
#     else:
#         form = SignUpForm()
#     return render(request, 'FashionApp/signup.html', {'form': form})



# import csv
# from datetime import datetime
# from .models import Product

# def add_products_from_csv(file_path):
#     with open(file_path, 'r') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             if row['article_id']:
#                 try:
#                     article_id = int(row['article_id'])
#                     # Convert other fields if needed

#                     # Create and save Product object
#                     product = Product.objects.create(
#                         article_id=article_id,
#                         product_code=row['product_code'],
#                         prod_name=row['prod_name'],
#                         product_type_no=int(row['product_type_no']),
#                         product_type_name=row['product_type_name'],
#                         product_group_name=row['product_group_name'],
#                         graphical_appearance_no=int(row['graphical_appearance_no']),
#                         graphical_appearance_name=row['graphical_appearance_name'],
#                         # Add other fields here
#                     )
#                     product.save()
#                 except ValueError:
#                     print(f"Invalid article_id: {row['article_id']}")



# @login_required(login_url='login')
# def enter_article_id(request):
#     if request.method == 'POST':
#         article_id = request.POST.get('article_id')
#         return redirect('article_details', article_id=article_id)
#     return render(request, 'FashionApp/enter_article_id.html')

# @login_required(login_url='login')
# def article_details(request, article_id):
#     try:
#         article = Product.objects.get(article_id=article_id)
#         image_url = f'http://127.0.0.1:8000/images/{article_id}.jpg'
#         return render(request, 'FashionApp/article_details.html', {'article': article, 'image_url': image_url})
#     except Product.DoesNotExist:
#         error_message = f'Article with ID {article_id} does not exist.'
#         return render(request, 'FashionApp/article_details.html', {'error_message': error_message})
    
# @unauth_user
class LoginPage(APIView):
    def post(self,request):
            username = request.data.get('username')
            password = request.data.get('password')
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return Response({'message': 'Login Successful', 'token': str(AccessToken.for_user(user))}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            

class SignUpPage(APIView):
    def post(self, request):
        form = SignUpForm(request.data)
        if form.is_valid():
            # Save the Customer
            customer = form.save(commit=False)

            # Take password from the Customer object
            password = customer.password
            customer.save()

            # Create a corresponding User
            user = User.objects.create_user(username=customer.username,
                                            email=customer.email,
                                            password=password)

            # Link User to Customer
            customer.user = user
            customer.save()

            return redirect('home')  # Redirect to a success page
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)



class ArticleDetails(APIView):
    def get(self, request):
        article_id = request.GET.get('article_id')
        if article_id:
            try:
                article = Product.objects.get(article_id=article_id)
                return Response({'article': article.serialize()}, status=status.HTTP_200_OK)
            except Product.DoesNotExist:
                return Response({'error': f'Article with ID {article_id} does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Article ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        article_id = request.data.get('article_id')
        if article_id:
            # Process your data here using the article_id
            # For example, save data related to the article_id
            processed_data = {'processed_article_id': article_id}
            return Response({'processed_data': processed_data}, status=status.HTTP_200_OK)

class FilterArticleListView(APIView):
    def get(self, request):
        # Get the value to filter from the request query parameters
        filter_value = request.GET.get('filter_value')

        # Query the database for article IDs with the specified value in the section name
        filtered_articles = Product.objects.filter(section_name__icontains=filter_value).values_list('article_id', flat=True)

        # Return the filtered article IDs in the response
        return Response({'article_ids': list(filtered_articles)})

import csv
from .models import Product




def create_product_from_csv_row(row):
    try:
        article_id = int(row['article_id'])
        product_code = row['product_code']
        prod_name = row['prod_name']
        product_type_no = int(row['product_type_no'])
        product_type_name = row['product_type_name']
        product_group_name = row['product_group_name']
        graphical_appearance_no = int(row['graphical_appearance_no'])
        graphical_appearance_name = row['graphical_appearance_name']
        colour_group_code = int(row['colour_group_code'])
        colour_group_name = row['colour_group_name']
        perceived_colour_value_id = int(row['perceived_colour_value_id'])
        perceived_colour_value_name = row['perceived_colour_value_name']
        perceived_colour_master_id = int(row['perceived_colour_master_id'])
        perceived_colour_master_name = row['perceived_colour_master_name']
        department_no = int(row['department_no'])
        department_name = row['department_name']
        index_code = row['index_code']
        index_name = row['index_name']
        index_group_no = int(row['index_group_no'])
        index_group_name = row['index_group_name']
        section_no = int(row['section_no'])
        section_name = row['section_name']
        garment_group_no = int(row['garment_group_no'])
        garment_group_name = row['garment_group_name']
        detail_desc = row['detail_desc']

        product = Product.objects.create(
            article_id=article_id,
            product_code=product_code,
            prod_name=prod_name,
            product_type_no=product_type_no,
            product_type_name=product_type_name,
            product_group_name=product_group_name,
            graphical_appearance_no=graphical_appearance_no,
            graphical_appearance_name=graphical_appearance_name,
            colour_group_code=colour_group_code,
            colour_group_name=colour_group_name,
            perceived_colour_value_id=perceived_colour_value_id,
            perceived_colour_value_name=perceived_colour_value_name,
            perceived_colour_master_id=perceived_colour_master_id,
            perceived_colour_master_name=perceived_colour_master_name,
            department_no=department_no,
            department_name=department_name,
            index_code=index_code,
            index_name=index_name,
            index_group_no=index_group_no,
            index_group_name=index_group_name,
            section_no=section_no,
            section_name=section_name,
            garment_group_no=garment_group_no,
            garment_group_name=garment_group_name,
            detail_desc=detail_desc
        )
        return product
    except ValueError:
        print(f"Invalid data in CSV row: {row}")
        return None





def add_products_from_csv(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            product = create_product_from_csv_row(row)
            if product:
                product.save()






@login_required(login_url='login')
def logout_view(request):
    logout(request)
    # Redirect to the login page or any other page after logout
    return redirect('login')


@login_required(login_url='login')
def home(request):
    #add_products_from_csv(file_path="D:\\Omkar\\productsfile.csv"
    return render(request,'FashionApp/home.html')


def remove_duplicate_products():
    # Get all distinct article_ids
    distinct_article_ids = Product.objects.values_list('article_id', flat=True).distinct()


    # Loop through each distinct article_id
    for article_id in distinct_article_ids:
        # Get all instances of the product with the same article_id
        products_with_same_article_id = Product.objects.filter(article_id=article_id)

        # Keep only one instance (you can choose any)
        product_to_keep = products_with_same_article_id.first()

        # Delete the remaining duplicate instances
        products_with_same_article_id.exclude(pk=product_to_keep.pk).delete()
        