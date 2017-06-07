task default: %w[build]

task :deploy do
 sh "bundle show bootstrap"
  puts "Starting Build."
  ruby "push_files.rb"
  puts "Build done."
end

task :build do
end
