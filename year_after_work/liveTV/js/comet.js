/**
 * Created by zhouyu on 27/12/2016.
 */
(function(jQuery) {
    // this === window
    jQuery.comet = this;

    this.socket =  null;

    this.connect = function (host, port, ns) {
        var url = 'http://' + host + ':' +port +'/' +ns;
        this.socket = io(url);
    };

    this.send = function (action, liveid) {

        if(!action || !liveid) {
            console.error('invalid params');
            return;
        }

        var data = {};
        data.liveid = liveid;
        this.socket.emit(action, data);

    };

    this.on = function (action, callback) {
        this.socket.on(action, callback);
    };



    // 新增评论
    this.sendChat = function (action, con) {
        var data = {};
        data.content = con;
        this.socket.emit(action, data);
    };



    this.bind = on;


    return jQuery;

})(jQuery);
