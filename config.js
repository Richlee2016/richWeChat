"use strict"
//΢配置config
var config = {
    wechat: {
        appID:'wx71706017cef3d96d',
        appSecret:'75d1f41637f8609fc5868595cbb35817',
        token:'Rich19Lee90Love04you03',
        getAccessToken:function(){
            return util.readFileAsync(wechat_file,"utf8");
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file,data);
        }
    }
};

module .exports = config;