var request = require('request');
var Slack = require('slack-node');
var bobtimeCheck = false;
var workEndCheck = false;
var slack = new Slack();

module.exports = function (req, res, next) {
    var botPayload = {};

    var boblist = process.env.BOBLIST.split(',');
    var currentRoll = roll(0, boblist.length - 1);

    // write response message and add to payload
    botPayload.text = req.body.user_name + " 님이 " + boblist[currentRoll] + '를 선택하었습니다.';

    botPayload.username = 'bobBot';
    botPayload.channel = req.body.channel_id;
    botPayload.icon_emoji = ':game_die:';

    // send dice roll
    send(botPayload, function (error, status, body) {
        if (error) {
            return next(error);

        } else if (status !== 200) {
            // inform user that our Incoming WebHook failed
            return next(new Error('Incoming WebHook: ' + status + ' ' + body));

        } else {
            return res.status(200).end();
        }
    });
}

function roll (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function send (payload, callback) {
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