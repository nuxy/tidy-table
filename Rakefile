desc "Check code quality"
task :jshint do
  system("jshint")
end

desc "Run test suite"
task :qunit do
  test_file = File.expand_path('test.html')
  system("phantomjs test/run-qunit.js file://#{test_file}") or exit!(1)
end

task :default => [:jshint, :qunit]
