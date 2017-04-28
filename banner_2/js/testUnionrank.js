/**
 * Created by chaclus on 16/9/2.
 */

var request = require('request');
var config = require('./configForTest');
//var testToken = require('./testGetToken');

 工会排名：只取前20名（动态的）的总和；
var testCreateActivity = function()  {
    var livData = {
        url: 'http://'+config.server_host+':'+config.server_port+'/api/'+config.server_version+'/bi/union/ranking',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'token': token
        },
        form: {
            begintime:'2017-04-12T17:00:00+00:00',
            endtime:'2017-04-27T17:00:00+00:00',
            page:1,
            size:10
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