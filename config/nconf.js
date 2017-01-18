const nconf = require('nconf');

nconf
.file({
  file: 'config.yml',
  format: require('nconf-yaml'),
})
.env()
.defaults({
  NODE_ENV: 'development',
  PORT: 8080,
  API_HOST: 'http://localhost:4333',
});

module.exports = nconf;
