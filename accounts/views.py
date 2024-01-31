# from django.contrib.auth import login
# from django.shortcuts import render, redirect
# from django.contrib.sites.shortcuts import get_current_site
# from django.utils.encoding import force_str
# from django.contrib.auth.models import User
# from django.utils.http import urlsafe_base64_decode
# from django.utils.encoding import force_bytes
# from django.utils.http import urlsafe_base64_encode
# from .tokens import account_activation_token
# from django.template.loader import render_to_string
# from .models import Profile, MyClass, Category, Comment
# from .forms import SignUpForm, MyClassForm
# from .tokens import account_activation_token
# from django.contrib.auth.decorators import login_required

# Restructure 
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    
    def get_queryset(self):
        queryset = Profile.objects.all()
        ordering = self.request.query_params.get('ordering', 'created_at')
        return queryset.order_by(ordering)

class UserLoginView(APIView):
    def post(self, request):
        # Get the username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # User is authenticated, generate or retrieve a token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserSignUpView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User and profile created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Delete the token to log out
            request.user.auth_token.delete()
            return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response({"error": "Bad request or Token not found."}, status=status.HTTP_400_BAD_REQUEST)

# def activation_sent_view(request):
#     return render(request, 'activation_sent.html')


# def activate(request, uidb64, token):
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#         user = None

#     if user is not None and account_activation_token.check_token(user, token):
#         user.is_active = True
#         user.profile.signup_confirmation = True
#         user.save()
#         login(request, user)
#         return redirect('index')
#     else:
#         return render(request, 'activation_invalid.html')

# def signup_view(request):
#     if request.method  == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             user.refresh_from_db()
#             user.profile.first_name = form.cleaned_data.get('first_name')
#             user.profile.last_name = form.cleaned_data.get('last_name')
#             user.profile.email = form.cleaned_data.get('email')
#             user.is_active = False
#             user.save()
#             current_site = get_current_site(request)
#             subject = 'Please Activate Your Account'
#             message = render_to_string('activation_request.html', {
#                 'user': user,
#                 'domain': current_site.domain,
#                 'uid': urlsafe_base64_encode(force_bytes(user.pk)),
#                 'token': account_activation_token.make_token(user),
#             })
#             user.email_user(subject, message)
#             return redirect('activation_sent')
#     else:
#         form = SignUpForm()
#     return render(request, 'signup.html', {'form': form})

# def about_view(request):
#     return render(request, 'about_us.html')

# def myclass_index(request):
#     myclasses = MyClass.objects.all().order_by("-created_on")
#     context = {
#         "myclasses": myclasses
#     }
#     return render(request, "index.html", context)

# def myclass_category(request, category):
#     # myclasses = MyClass.objects.filter(
#     #     categories__name__contains=category
#     # ).classes.all().order_by("-created_on")
#     myclasses = Category.objects.get(name=category).classes.all()
#     context = {
#         "category": category,
#         "myclasses": myclasses,
#     }
#     return render(request, "myclass/category.html", context)

# def myclass_detail(request, pk):
#     myclass = MyClass.objects.get(pk=pk)
#     comments = Comment.objects.filter(myclass=myclass)
#     context = {
#         "myclass": myclass,
#         "comments": comments,
#     }
#     return render(request, "myclass/detail.html", context)

# @login_required
# def new_class(request):
#     form = MyClassForm(request.POST or None)
#     if request.method == "POST":
#         if form.is_valid():
#             myclass = form.save(commit=False)
#             profile = request.user.profile
#             myclass.creator = profile
#             form.save()
#             return redirect("myclass_index")
#     return render(request, "myclass/new.html", {"form": form})

# # For how to handle error visit this https://realpython.com/build-a-blog-from-scratch-django/#define-models-to-represent-database-tables

# # Use this to refresh how to use form in Django
# # https://realpython.com/django-social-forms-4/#render-the-form-in-your-template
