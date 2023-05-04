exports.config = {
  runner: 'local',
  specs: ['./test/**/*.js'],
  exclude: [],
  maxInstances: 1,
  injectGlobals: false,
  capabilities: [{
    maxInstances: 1,
    browserName: 'firefox',
    acceptInsecureCerts: true
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'file://',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
