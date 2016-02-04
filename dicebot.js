var request = require('request');

module.exports = function (req, res, next) {
    // default roll is 2d6
    var matches;
    var die = 100;
    var botPayload = {};

    if (req.body.text) {
        // parse roll type if specified
        matches = req.body.text.match(/^(\d{1,3})$/);

        if (matches && matches[1]) {
            die = matches[1];
        } else {
            // send error message back to user if input is bad
            return res.status(200).send('<number> ( 1 - 999)');
        }
    }
    var currentRoll = roll(1, die);

    // write response message and add to payload
    botPayload.text = '_' + req.body.user_name + '_님이 주사위를 굴려 *' + currentRoll + '* 가 나왔습니다. ( 1 - ' + die + ' )';

    botPayload.username = 'dicebot';
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