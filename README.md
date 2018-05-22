# PraxKit Web

Build css with gulp
build website with jekyll

Setup

        brew install rvm
        rvm install ruby 2.4.1 / rbenv install 2.4.1
        gem install bundler
        bundle install

        brew install yarn
        yarn install


Use `gulp` to build assets.

Use `rake deploy`to deploy. Thanks to [jekyll-rake](https://github.com/avillafiorita/jekyll-rakefile).


Build website

        bundle exec jekyll serve --watch --incremental


This is how we do it

        bundle exec jekyll serve --watch --source src

On the local network

        bundle exec jekyll serve --watch --source src --host 0.0.0.0

Before deploy
        
        bundle exec jekyll build --source src  
        

See [this post](https://stackoverflow.com/documentation/twitter-bootstrap/9090/migrating-to-bootstrap-4/28674/bootstrap-4-navbar#t=201703020350421197321) for Bootstap 4 migration.


# IE Flexbox

Bug https://connect.microsoft.com/IE/feedback/details/802625/min-height-and-flexbox-flex-direction-column-dont-work-together-in-ie-10-11-preview

Fix? https://codepen.io/boostnewmedia/pen/kvtoF

TODO Update Bootstrap 4
