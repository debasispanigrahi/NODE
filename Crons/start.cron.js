require('module-alias/register');
const { getSessionFile } = require('@root/Helpers/utilty');
const fs = require('fs');
const CRON_FILE = "Data/cron.json";
let cron_content
cron_content = getSessionFile(CRON_FILE);
let new_interval = cron_content.start.time;
let interval = new_interval;
var run = setInterval(request, interval); // start setInterval as "run"
function request() {
    console.log(`Called in ${cron_content.start.content}`);
}
fs.watchFile(CRON_FILE, () => {
    cron_content = getSessionFile(CRON_FILE);
    new_interval = cron_content.start.time;
    if (interval != new_interval) {
        interval = new_interval
        clearInterval(run);
        run = setInterval(request, interval);
    }

})