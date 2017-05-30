task default: %w[build]

task :build do
  puts "Starting Build."
  ruby "push_files.rb"
  puts "Build done."
end