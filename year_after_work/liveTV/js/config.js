
// 线上
var rootUrl = 'http://52.77.61.48:3030/api/v1';
var comet_host = '52.77.61.48';
var comet_port = '9199';

var serverUrl = 'https://dee.tutulive.tv:8446/api/v1/man';

// 阿里云
// var rootUrl = 'http://123.56.6.6:3030/api/v1';
// var comet_host = '123.56.6.6';
// var comet_port = '9199';

// var serverUrl = 'http://123.56.6.6:8018/api/v1/man';


//千分 数值
function toThousands(num) {
　　var re=/\d{1,3}(?=(\d{3})+$)/g;
　　var n1=(num || 0).toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
　　return n1;
}
//数据排序
function byOrder(data) {
    var newarr = [];
    var newarr2 = [];
    for(var i in data){
        newarr.push(data[i].order)
    }
    newarr.sort(order);
    for(var i in newarr){
        for(var j in data){
            if(data[j].order==newarr[i]){
                newarr2.push(data[j])
            }
        }
    }
    function order(x,y){
        return x-y
    }
    return newarr2;
}