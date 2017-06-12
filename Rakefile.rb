task default: %w[build]

task :deploy => :build do
 sh "bundle show bootstrap"
  puts "Starting Build."
  ruby "push_files.rb"
  puts "Build done."
end

task :build do
  jekyll("build --source src")
end

# launch jekyll
def jekyll(directives = '')
  sh 'bundle exec jekyll ' + directives
end