# djangotemplates/example/views.py
from django.contrib.auth import login, authenticate

from django.shortcuts import render, redirect
from django.views.generic import TemplateView  # Import TemplateView
from home.forms import HomeForm


# Add the two views we have been talking about  all this time :)
class HomePageView(TemplateView):
    template_name = "index.html"


class AboutPageView(TemplateView):
    template_name = "about.html"

    def get(self, request):
        form = HomeForm()


        return render(request, self.template_name, {'form': form})

    def post(self, request):
        sample_chapter = None
        text = None
        form = HomeForm(request.POST, request.FILES)

        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()


            text = form.cleaned_data['post']
            sample_chapter = form.cleaned_data['post']
            form = HomeForm()
            # return redirect('home:home')

        args = {'form': form, 'text': text, 'sample_chapter': sample_chapter}
        return render(request, 'about.html', args)

    # def get(self,request):
    #     if request.method == 'POST':
    #         form = UserCreationForm(request.POST)
    #         if form.is_valid():
    #             form.save()
    #             username = form.cleaned_data.get('username')
    #             raw_password = form.cleaned_data.get('password1')
    #             user = authenticate(username=username, password=raw_password)
    #             login(request, user)
    #             return redirect('home')
    #     else:
    #         form = UserCreationForm()
    #     return render(request, 'about.html', {'form': form})
