from django import forms
from home.models import Post
# from django.contrib.auth.forms import formss
# from django.contrib.auth.models import User

FRUIT_CHOICES= [
    ('orange', 'Oranges'),
    ('cantaloupe', 'Cantaloupes'),
    ('mango', 'Mangoes'),
    ('honeydew', 'Honeydews'),
    ]

class HomeForm(forms.ModelForm):
    post = forms.CharField(widget=forms.TextInput(
        attrs={
            'class': 'form-control',


        }
    ))
    name = forms.CharField(widget=forms.TextInput(
        attrs={
            'class' :'base',
            'max_length': '30',
            'required': 'False',
            'help_text': 'Optional.',

        }
    ))
    language = forms.CharField(widget=forms.TextInput(
        attrs={
            'class' :'base',
            'max_length': '30',
            'required': 'False',
            'help_text': 'Optional.',

        }
    ))
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')
    # picture = forms.ImageField()
    sample_chapter = forms.FileField(label='Select a file',
        help_text='max. 42 megabytes')
    cover_image = forms.ImageField(label='Select a file',
                                     help_text='max. 42 megabytes')
    favorite_fruit = forms.CharField(label='What is your favorite fruit?', widget=forms.Select(choices=FRUIT_CHOICES))

    class Meta:
        model = Post
        fields = ('post', 'name','language', 'email', 'sample_chapter','cover_image','favorite_fruit',)