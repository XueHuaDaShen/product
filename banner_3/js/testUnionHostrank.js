/**
 * Created by chaclus on 16/9/2.
 */

var request = require('request');
var config = require('./configForTest');
//var testToken = require('./testGetToken');


常规礼物排名：按鱼蛋总数排名，每2周统计一次

var testCreateActivity = function()  {
    var livData = {
        url: 'http://'+config.server_host+':'+config.server_port+'/api/'+config.server_version+'/bi/union/host/coins/ranking',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'token': token
        },
        json: {
            begintime:'2017-04-12T17:00:00+00:00',
            endtime:'2017-04-27T17:00:00+00:00',
            page:1,
            size:10,
            unionlist:["58ad3305067299a033f131d1","58ad3342067299a033f131d6"]
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