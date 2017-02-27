var sha1 = require('sha1');
module.exports = function (opts){
    return function *(next){
        this.set('Cache-Control','no-cache');
        console.log(this.query);
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;

        var str = [token,timestamp, nonce].sort().join('');
        var sha = sha1(str);
        console.log(sha);
        if(sha === signature){
            this.body = echostr + '';
        }else{
            this.body = 'wrong';
        };
    };
}

