//字符模板处理
var ejs = require('ejs');
var heredoc = require('heredoc');
var tpl = heredoc(function (){/*
    <xml>
         <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
         <FromUserName><![CDATA[<% fromUserName %>]]></FromUserName>
         <CreateTime><% createTime %></CreateTime>
         <MsgType><![CDATA[<% msgType %>]]></MsgType>
         <% if(message.MsgType === 'text'){ %>
            <Content><![CDATA[<% content %>]]></Content>
         <% }else if(message.MsgType === 'image'){ %>
             <Image>
                <MediaId><![CDATA[<% mediaId %>]]></MediaId>
             </Image>
         <% }else if(message.MsgType === 'voice'){ %>
             <Voice>
                <MediaId><![CDATA[<% mediaId %>]]></MediaId>
             </Voice>
         <% }else if(message.MsgType === 'video'){ %>
             <Video>
                 <MediaId><![CDATA[<% mediaId %>]]></MediaId>
                 <Title><![CDATA[<% title %>]]></Title>
                 <Description><![<% description %>]]></Description>
             </Video>
         <% }else if(message.MsgType === 'music'){ %>
             <Music>
                 <Title><![CDATA[<% title %>]]></Title>
                 <Description><![<% description %>]]></Description>
                 <MusicUrl><![<% musicUrl %>]]></MusicUrl>
                 <HQMusicUrl><![<% hqMusicUrl %>]]></HQMusicUrl>
                 <ThumbMediaId><![<% thumbMediaId %>]]></ThumbMediaId>
             </Music>
         <% }else if(message.MsgType === 'news'){ %>
             <ArticleCount><% articleCount.length %></ArticleCount>
             <Articles>
                 <% articleCount.forEach(function(item){ %>
                 <item>
                     <Title><![CDATA[<% item.title %>]]></Title>
                     <Description><![CDATA[<% item.description %>]]></Description>
                     <PicUrl><![CDATA[<% item.picUrl %>]]></PicUrl>
                     <Url><![CDATA[<% item.url %>]]></Url>
                 </item>
                <% }) %>
             </Articles>
         <% } %>
    </xml>
*/});

var compiled = ejs.compile(tpl);

exports = module.exports = {
    compiled:compiled
}