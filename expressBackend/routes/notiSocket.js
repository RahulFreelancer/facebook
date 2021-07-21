// const Chat = require('../dbModels/apiChat');
const Users = require('../dbModels/apiRegister');
const Notification =require('../dbModels/apiNotification')
module.exports = function(io) {
    const optionObj = { fullDocument: 'updateLookup' };
      
  const inspectNotiDb = Notification.watch(optionObj)

    let socketToUserNoti={};
    let userToSocketNoti={};
    const notiSocket=io.of("/expressApi/notiSocket");
    notiSocket.use((socket,next)=>{
 
        if(!socket.handshake.auth.token){
          const err = new Error("not authorized");
          err.data = { content: "Please retry later" }; // additional details
          next(err);
          return;
        }
        else{
          next()}
      })


      notiSocket.on('connection',async(socket)=>{
          
          console.log(socket.handshake.auth);
          socket.on('getInitUpdateNoti',async(args)=>{
            
            const allNoti = await Notification.findOne({username:args.username}).populate('notifications.userInfo','username fname sname');
            console.log(allNoti.newNoti);
            socket.emit('receiveInitUpdateNoti',{notifications:allNoti.notifications,newNoti:allNoti.newNoti})
          })
      
          socketToUserNoti[socket.id]=socket.handshake.auth.username;
          userToSocketNoti[socket.handshake.auth.username]=socket.id;

         socket.on('disconnect',()=>{
           delete userToSocketNoti[socketToUserNoti[socket.id]] ;
           delete socketToUserNoti[socket.id];
         })
      })

  
        
     inspectNotiDb.on('change',async(change)=>{
        

        if(change.fullDocument&&change.updateDescription){
            const allNotii = await Notification.findOne({username:change.fullDocument.username}).populate('notifications.userInfo','username fname sname');
           notiSocket.to(userToSocketNoti[change.fullDocument.username]).emit('receiveNoti'
              ,{notifications:allNotii.notifications,newNoti:change.fullDocument.newNoti})
          
        }
      })



    

};