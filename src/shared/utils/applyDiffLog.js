const diffLog = require('../lib/diffLog').plugin;

function applyDiffLogPlugin(schema) {
  if (process.env.LOG === 'true') {
    schema.plugin(diffLog);
  }
}

module.exports = { applyDiffLogPlugin };
