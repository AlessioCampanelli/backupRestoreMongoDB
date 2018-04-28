var Schedule = require('node-schedule');
var Config = require('config');
var Moment = require('moment');
var Color = require('colors');
var Backup = require('mongodb-backup');
var Restore = require('mongodb-restore');

Schedule.scheduleJob('* * 9 * *', function() {
    //execBackup();
});

var execBackup = function() {
    Backup({
        uri: Config.MONGO_URI,
        root: Config.PATH,
        callback: function(err) {
            if (err) {
                console.log('BACKUP ERROR: '.red.bold, err);
            } else {
                console.log('BACKUPED DATABASE: '.green.bold, Config.MONGO_URI);
            }
        },
        tar: Moment().format('dddd') + '.tar'
    });
};

var execRestore = function() {
    Restore({
        uri: Config.MONGO_URI,
        root: Config.PATH,
        callback: function(err) {
            if (err) {
                console.log('RESTORE ERROR: '.red.bold, err);
            } else {
                console.log('RESTORED DATABASE: '.green.bold, Config.MONGO_URI);
            }
        }
    });
}

// execBackup();
execRestore();
