require 'jshint/tasks'

JSHint.config_path = 'test/jshint.yml'

task :qunit do
  test_file = File.expand_path('test.html')
  system("phantomjs test/run-qunit.js file://#{test_file}")
end

task :default => [:jshint, ':qunit']
