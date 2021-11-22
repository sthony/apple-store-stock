// Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [{
    name: 'backend',
    script: 'bin/www',
    instances: 1,
    watch: false,
    mode: 'fork',
  }],
};
