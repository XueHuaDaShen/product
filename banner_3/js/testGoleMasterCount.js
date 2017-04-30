/**
 * Created by chaclus on 16/9/2.
 */

var request = require('request');
var config = require('./configForTest');
//var testToken = require('./testGetToken');

金主排名：同之前  
var testCreateActivity = function()  {
    var livData = {
        url: 'http://52.77.61.48:8040/api/v1/bi/fan/ranking',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'token': token
        },
        form: {
            begintime:'2017-04-12T17:00:00+00:00',
            endtime:'2017-04-28T00:00:00+00:00',
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