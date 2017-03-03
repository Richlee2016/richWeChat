"use strict"
exports.reply = function *(next){
    var message = this.weixinMsg;
    //事件
    if( message.MsgType === 'event' ){
        if( message.Event === 'subscribe' ){
            if( message.EventKey ){
                console.log('二维码进入' + message.EventKey + message.ticket);
            };
            this.body = '您订阅了Rich的小屋，尝试分别回复 1、2、3';
        }else if( message.Event === 'unsubscribe' ){
            console.log('取消了关注');
            this.body ='';
        }else if( message.Event === 'LOCATION' ){//上报地理位置
            this.body = '位置为' + message.Latitude + message.Longitude + message.Precision;
        }else if( message.Event === 'CLICK' ){//点击菜单
            this.body = '您点击了菜单'
        }else if( message.Event === 'SCAN' ){//扫描
            this.body ='关注后扫二维码'
        }else if( message.Event === 'VIEW' ){//点击菜单链接
            this.body ='您点击了菜单中的链接'
        };
    }else if (message.MsgType === "text"){
        var content = message.Content;
        var reply = "你说了" + content;
        if(content === '1'){
            reply = "只有你最棒";
        }else if(content === '2'){
            reply = "给你一个蚊香站赞"
        }else if(content === '3'){
            reply =[{
                    title:'厉害了我的哥',
                    description:'这是熊猫人部落',
                    picUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488519519161&di=5713016842efe142d0a9e80eb6912f65&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dce5e833982d4b31cf03c94b3b7d7276f%2F24328a2442a7d9334c267c09a44bd11372f001bb.jpg',
                    url:'https://github.com/Richlee2016'
                }]
        };
        this.body = reply;
    };
    yield next;
};
