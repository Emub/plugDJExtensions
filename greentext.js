API.on(API.CHAT, function(obj){
scroll = $('#chat-messages').scrollTop() > $('#chat-messages')[0].scrollHeight - $('#chat-messages').height() - 20;
if(obj.message.indexOf("&gt;") === 0){
        greenText = obj.message.replace(/&gt;/g, "<br>>");
        $('.cid-'+obj.chatID).children('.text').html("<span style='color: #72AF23'>"+greenText+"</span>");
scroll && $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
}
})
