/**
 * Created by hyundong.kim on 2015-12-20.
 */
var request = require('request');

module.exports.roll = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports.send = function(payload, callback) {
    var path = process.env.INCOMING_WEBHOOK_PATH;
    var uri = 'https://hooks.slack.com/services' + path;

    request({
        uri: uri,
        method: 'POST',
        body: JSON.stringify(payload)
    }, function (error, response, body) {
        if (error) {
            return callback(error);
        }

        callback(null, response.statusCode, body);
    });
}

module.exports.test = function() {
    console.log('SlackUtil test');
}