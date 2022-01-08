const core = require('@actions/core');

try {
  // `who-to-greet` input defined in action metadata file
  const networkId = core.getInput('network-id');
  const apiAccessToken = core.getInput('api-access-token')
  const format = core.getInput('format')
  core.setOutput('hosts', '')
} catch (error) {
  core.setFailed(error.message);
}