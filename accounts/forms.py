# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
# from phonenumber_field.formfields import PhoneNumberField
# from .models import MyClass

# class SignUpForm(UserCreationForm):
#     first_name = forms.CharField(max_length=100, help_text='Last Name')
#     last_name = forms.CharField(max_length=100, help_text='Last Name')
#     email = forms.EmailField(max_length=150, help_text='Email')
#     phone_number = PhoneNumberField(label='Phone Number', required=False, help_text='Phone number')
#     location = forms.CharField(max_length=100, help_text='House location')

#     class Meta:
#         model = User
#         fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'location', 'password1', 'password2', )

# class MyClassForm(forms.ModelForm):
#     description = forms.CharField(
#         required=True,
#         widget=forms.widgets.Textarea(
#             attrs={
#                 "placeholder": "What do you want to teach?"
#                 #Add style here 
#             }
#         ),
#     )

# # This options class allows you to pass any information that isn’t a field to your form class
#     class Meta: 
#         model = MyClass
#         fields = ('title', 'categories', 'description')