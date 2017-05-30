task default: %w[build]

task :build do
  ruby "push_files.rb"
end