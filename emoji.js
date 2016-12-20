/**
 * Created by hyundong.kim on 2015-12-10.
 */
var Util = require('./SlackUtil');

module.exports.common = function (req, res, next) {
    findEmoji(req, res, next, SendEmoji)
}

function SendEmoji(req, res, next, count) {
    var botPayload = {};
    botPayload.text = req.body.user_name + " 님이 \n";
    for (var i = 0; i < count; ++i)
    {
        for (var j = 0; j < count; ++j)
        {
            botPayload.text += ':' + req.body.text.toString() + '_' + i.toString() + j.toString() + ':';
        }
        botPayload.text += '\n';
    }
    botPayload.username = 'emojiBot';
    botPayload.channel = req.body.channel_id;
    botPayload.icon_emoji = ':smile_ca:';

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

module.exports.frog = function (req, res, next) {
    var msg = "sadfrog";
    var botPayload = {};
    botPayload.text = req.body.user_name + " 님이 \n :"+msg+"_00::"+msg+"_01::"+msg+"_02:\n:"+msg+"_10::"+msg+"_11::"+msg+"_12:\n:"+msg+"_20::"+msg+"_21::"+msg+"_22:";
    botPayload.username = 'emojiBot';
    botPayload.channel = req.body.channel_id;
    botPayload.icon_emoji = ':smile_ca:';

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

module.exports.dogSound = function (req, res, next) {
    var msg = "dogsound";
    var botPayload = {};
    botPayload.text = req.body.user_name + " 님이 \n :"+msg+"_00::"+msg+"_01::"+msg+"_02:\n:"+msg+"_10::"+msg+"_11::"+msg+"_12:\n:"+msg+"_20::"+msg+"_21::"+msg+"_22:";
    botPayload.username = 'emojiBot';
    botPayload.channel = req.body.channel_id;
    botPayload.icon_emoji = ':smile_ca:';

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

function findEmoji(req, res, next, callback) {
    var uri = process.env.EMOJI_TOKEN;

    // 일단 리스트 받아옴
    request({
        uri: uri,
        method: 'POST',
    }, function (error, response, body) {
        if (error) { return callback(error); }
        var data = JSON.parse(body);
        for (var count = 0; count < 10; ++count)
        {
            if (!data.emoji[req.body.text + '_' + count + count])
            {
               break;
            }
        }
        if (count > 0) { callback(req, res, next, count); }
    })
}