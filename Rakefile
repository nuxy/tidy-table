task :jshint do
  test_file = File.expand_path('jquery.tidy.table.js')
  system("jshint file://#{test_file}")
end

task :qunit do
  test_file = File.expand_path('test.html')
  system("phantomjs test/run-qunit.js file://#{test_file}")
end

task :default => [:jshint, :qunit]
