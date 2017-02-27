var Koa = require('koa');
var router = require('koa-router')();
var wechat = require('./wechat/generator');
//øÁ”Ú«Î«Û
var app = new Koa();

//Œ¢–≈config
var config = {
    wechat: {
        appID:'wx71706017cef3d96d',
        appSecret:'75d1f41637f8609fc5868595cbb35817',
        token:'Rich19Lee90Love04you03'
    }
}


router.get('/',wechat(config.wechat));


app.use(router.routes());
app.listen(3000);
