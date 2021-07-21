const Chat = require('../dbModels/apiChat');
const Users = require('../dbModels/apiRegister');

module.exports = function(io) {
    let socketToUserChat={};
    let userToSocketChat={};
    const chatSocket=io.of("/expressApi/chat");
    chatSocket.use((socket,next)=>{
 
        if(!socket.handshake.auth.token){
          const err = new Error("not authorized");
          err.data = { content: "Please retry later" }; // additional details
          next(err);
          return;
        }
        else{
          next()}
      })


      chatSocket.on('connection',async(socket)=>{
          console.log(socket.handshake.auth);
          socket.on('getInitUpdate',async(args)=>{
            const chats = await Chat.findOne({username:args.username}).populate(`allChats.userInfo allChats.chat.userInfo,username fname sname _id`);;
            socket.emit('receiveInitUpdate',{allChats:chats.allChats,newMsgNoti:chats.newMsgNoti})
          })
// mapping username to id of connected users
          socketToUserChat[socket.id]=socket.handshake.auth.username;
          userToSocketChat[socket.handshake.auth.username]=socket.id;

          socket.on('sendMsg',(args)=>{
              chatSocket.to(userToSocketChat[args.msgObj.to]).emit('receiveMsg',
              {msgObj:args.msgObj})
        })
          socket.on('sendSeenAllMsg',(args)=>{
              chatSocket.to(userToSocketChat[args.seenOf]).emit('receiveSeenAllMsg',
              {seenBy:args.seenBy,seenOf:args.seenOf})
        })




         socket.on('disconnect',()=>{
           delete userToSocketChat[socketToUserChat[socket.id]] ;
           delete socketToUserChat[socket.id];
         })
      })

  
          
    

};