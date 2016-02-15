var Util = require('./SlackUtil');

module.exports = function (req, res, next) {
    var botPayload = {};

    var boblist = process.env.BOBLIST.split(',');
    var currentRoll = Util.roll(0, boblist.length - 1);

    // write response message and add to payload
    botPayload.text = req.body.user_name + " 님이 " + boblist[currentRoll] + '를 선택하었습니다.';

    botPayload.username = 'bobBot';
    botPayload.channel = req.body.channel_id;
    botPayload.icon_emoji = ':game_die:';

    // send dice roll
    Util.send(botPayload, function (error, status, body) {
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