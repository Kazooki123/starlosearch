const AuditLog = require('auditlog');

const auditLog = new AuditLog();

auditLog.on('activity', (activity) => {
  console.log(activity);
});

auditLog.start();