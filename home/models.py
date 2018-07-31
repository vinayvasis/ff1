from django.db import models
from django.contrib.auth.models import User
from django import forms
# Create your models here.

class Post(models.Model):
    post = models.CharField(max_length=500)
    name = models.CharField(max_length=140, default='SOME STRING')
    language = models.CharField(max_length=140, default='SOME STRING')
    email = models.EmailField(max_length=140, default='SOME STRING')
    # picture = models.ImageField(upload_to='img')
    sample_chapter = models.FileField(blank=True, null=True,
                                       upload_to="chapters/%Y/%m/$D/")
    cover_image = models.ImageField(blank=True, null=True,
                                    upload_to="covers/%Y/%m/%D/")
    favorite_fruit = models.CharField( max_length=500, null=True,)
    state = models.CharField(max_length=500, null=True, )
    user = models.ForeignKey(User,on_delete=models.CASCADE,)

