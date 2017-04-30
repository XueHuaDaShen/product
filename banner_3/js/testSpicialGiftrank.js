/**
 * Created by chaclus on 16/9/2.
 */

var request = require('request');
var config = require('./configForTest');
//var testToken = require('./testGetToken');
特殊礼物排名：按某一个特殊礼物的鱼蛋收入排名，没2周统计一次

var testCreateActivity = function()  {
    var livData = {
        url: 'http://'+config.server_host+':'+config.server_port+'/api/'+config.server_version+'/bi/host/special/gift/ranking',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'token': token
        },
        form: {
            begintime:'2017-04-16T17:00:00+00:00',
            endtime:'2017-04-28T17:00:00+00:00',
            page:1,
            size:10,
            giftcode:82
        }
    };

    request(livData, function (error, res, body) {
        if(error) {
            console.log(error);
        }else{
            console.log("create admin: ", body);
        }
    });
};

testCreateActivity()