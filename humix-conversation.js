var HumixSense = require('humix-sense');
var Conv = require('./index');
var fs = require('fs');
//var moduleConfig = require('./config.js');

var config = {
    "moduleName": "humix-conversation-module",
    "commands": ["tts"],
    "events": ["stt"],
    "log": {
        file: 'humix-conversation-module.log',
        fileLevel: 'info',
        consoleLevel: 'debug'
    }
};

var humix = new HumixSense(config);
var conversation;
var hsm;
var logger;

console.log('========= starting ===========');

humix.on('connection', function(humixSensorModule) {
    hsm = humixSensorModule;

    logger = hsm.getLogger();

    logger.info('access config');
    var conf = hsm.getDefaultConfig();
    var deviceMac;

    // Fetch the computer's mac address 
    require('getmac').getMac(function(err, macAddress) {
        if (err) throw err;
        logger.info('Get device mac address: ' + macAddress);
        deviceMac = macAddress.replace(/\:/g, "");
    });

    if (!conf) {

        if (fs.existsSync('./config.js')) {

            logger.info('using local config file')
            conf = require('./config.js');

        } else {

            logger.error('fail to load conversation config. Exit');
            process.exit(1);
        }

    }

    logger.info('loading config: ' + JSON.stringify(conf));
    conversation = new Conv(conf, logger)
    conversation.init();

    logger.info('Communication with humix-sense is now ready.');

    hsm.on("tts", function(data) {
        logger.debug('received tts data:' + data);

        // TODO : Check the type of data.
        conversation.say(data);
    })

    conversation.on('msg', function(msg) {
        logger.debug('about to publish:' + msg);

        var input = { dev_mac: deviceMac, message: msg };
        if (hsm) {
            hsm.event('stt', JSON.stringify(input));
        }
    });

});