/**
 * Created by chaclus on 16/9/2.
 */
init 获取工会ID

var request = require('request');
var config = require('./configForTest');
//var testToken = require('./testGetToken');


var testCreateActivity = function()  {
    var livData = {
        url: 'http://'+config.server_host+':'+config.server_port+'/api/'+config.server_version+'/bi/union/list',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'token': token
        },
        form: {
            begintime:'2017-04-12T17:00:00+00:00',
            endtime:'2017-04-27T17:00:00+00:00',
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