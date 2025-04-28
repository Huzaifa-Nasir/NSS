const FirewallRule = require('../models/FirewallRule');

const evaluateTraffic = async (ip, port, protocol) => {
  const rules = await FirewallRule.find({}).sort({ priority: 1 });

  for (let rule of rules) {
    if (
      (rule.ip === ip || rule.ip === '*') &&
      (rule.port === port || rule.port === '*') &&
      (rule.protocol === protocol || rule.protocol === '*')
    ) {
      return rule.action;
    }
  }
  return 'allow'; // default allow
};

module.exports = { evaluateTraffic };
