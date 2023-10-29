import fs from 'fs';

function logEvent(event) {
    const timestamp = new Data().tolSOString();
    const logMessage = '${timestamp}: ${event}\n';

    fs.appendFile('audit.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to audit log:', err);
        }
    });
}

export { logEvent };