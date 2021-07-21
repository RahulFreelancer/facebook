const getAllRequests = require('./routes/getAllRequest');
const getStatus= require('./routes/status');
const database =require('./utils/dbConnect')
const UserDetail = require('./dbModels/apiUserDetail');
const Friends = require('./dbModels/apiFriends');
const express= require('express');
const mongoose = require('mongoose');
const app = require('express')();
const auth = require('./utils/auth');
const http = require("http").createServer(app);
const io = require('socket.io')(http,{

    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
require('./routes/chatSocket')(io);
require('./routes/notiSocket')(io);
require('./routes/homeSocket')(io);
  const options = { fullDocument: 'updateLookup' };
  
  const inspect = Friends.watch(options);
  const friendsNotiChangeInspect = Friends.watch(options);
  const friendRequestsInspect = 
  Friends.watch(options);

  let socketToUser={};
  let userToSocket={};
let friendsNotiSocketToUser={};
let friendsNotiUserToSocket={};

let friendRequestsSocketToUser={};
let friendRequestsUserToSocket={};












const cors = require('cors');
const { connection } = require('mongoose');
// app.use(auth);
database.connect();
app.use(cors());
app.use(express.json());

// const filter = [{
//     $match: {'fullDocument.username':username}
    
// }];

// const options = { fullDocument: 'updateLookup' };


// const inspect = UserDetail.watch(filter,options);
// inspect.on('change',(change)=>{console.log(change)})

app.get('/expressApi/getAllRequest',async(req,res)=>{
  try {
    const user= await UserDetail.findOne({username:"Rahulchoudhary6048622f32b8a65b00c1c37a"});
    res.send(user);
  } catch (e) {
    console.log(e.message);
    res.status(503).send('gadbad ghotala')
  }
    
  
})



const status = io.of("/expressApi/relationStatus");
const friendsNotiSocket=  io.of("/expressApi/friendsNotiCount");
const friendRequestsSocket=  io.of("/expressApi/friendRequests");






friendRequestsSocket.use((socket,next)=>{
 
  if(!socket.handshake.auth.token){
    const err = new Error("not authorized");
    err.data = { content: "Please retry later" }; // additional details
    next(err);
    return;
  }
  else{
    next()}
})




friendsNotiSocket.use((socket,next)=>{
 
  if(!socket.handshake.auth.token){
    const err = new Error("not authorized");
    err.data = { content: "Please retry later" }; // additional details
    next(err);
    return;
  }
  else{
    next()}
})
status.use((socket,next)=>{
 
  if(!socket.handshake.auth.token){
    const err = new Error("not authorized");
    err.data = { content: "Please retry later" }; // additional details
    next(err);
    return;
  }
  else{
    next()}
})


//friendRequests socket implementation
friendRequestsSocket.on('connection',async(socket)=>{
  console.log('friendrequestuser wala hua connect');
socket.on('getInitialRequests',async(args)=>{
  try {
    const userDetail = await Friends.findOne({username:args.username});
    socket.emit('updateInitialRequests',{rec:userDetail.requestReceived,apdByOther:userDetail.acceptedByOther})
  } catch (e) {
    console.log(e.message)
  }
})

friendRequestsSocketToUser[socket.id]=socket.handshake.auth.username;
friendRequestsUserToSocket[socket.handshake.auth.username]=socket.id;
socket.on('disconnect',()=>{
  console.log('friendrequestuser wala hua disconnect')
 delete friendRequestsUserToSocket[friendRequestsSocketToUser[socket.id]] ;
 delete friendRequestsSocketToUser[socket.id];
})
})

friendRequestsInspect.on('change',(change)=>{
  console.log('requestchnage');
  if(change.fullDocument&&change.updateDescription){
    if(change.fullDocument.operationType==='insert'&&(change.updateDescription.updatedFields.requestReceived||
      change.updateDescription.updatedFields.acceptedByOther)){
    console.log(change.fullDocument.operationType);
        friendRequestsSocket.to(friendRequestsUserToSocket[change.fullDocument.username]).emit('updateFriendReqs'
        ,{accepted:change.fullDocument.acceptedByOther,received:change.fullDocument.requestReceived})
    } 
  }
 
})


//friendsNotification socket implementation

friendsNotiSocket.on('connection' ,async(socket)=>{

socket.on('updateNoti',async(args)=>{
  
  try {
    const userDetail = await Friends.findOne({username:args.username})
    const notSeenRequests=userDetail.requestReceived.filter((reqs)=>{
      return reqs.seen===false;
    });
    const notSeenAcceptedByOther=userDetail.acceptedByOther.filter((reqs)=>{
      return reqs.seen===false;
    })
    
    userDetail.friendsNotiCount=
    notSeenRequests.length+notSeenAcceptedByOther.length;
  
    socket.emit('updatedNotiCount',userDetail.friendsNotiCount);
    
    const saveUserdetail = new Friends(userDetail);
    await saveUserdetail.save();
} catch (e) {
    console.log(e.message);
  }})

 
friendsNotiSocketToUser[socket.id]=socket.handshake.auth.username;
friendsNotiUserToSocket[socket.handshake.auth.username]=socket.id;
socket.on('disconnect',()=>{
 delete friendsNotiUserToSocket[friendsNotiSocketToUser[socket.id]] ;
 delete friendsNotiSocketToUser[socket.id];
})
})

friendsNotiChangeInspect.on('change',(change)=>{
  console.log('noti chnage');
  if(change.updateDescription){if("friendsNotiCount" in change.updateDescription.updatedFields){
    friendsNotiSocket.to(friendsNotiUserToSocket[change.fullDocument.username]).emit('updateFriendsNotiCount'
    ,change.fullDocument.friendsNotiCount)
  }}
  
  })







//status socket implementation
status.on('connection',async(socket)=>{
  socket.on('getStatus',async(args)=>{
    const friendsdb= await Friends.findOne({username:args.username})
  
    socket.emit('initialUpdate',friendsdb);
  })
 
 socketToUser[socket.id]=socket.handshake.auth.username;
 userToSocket[socket.handshake.auth.username]=socket.id;
socket.on('disconnect',()=>{
  delete userToSocket[socketToUser[socket.id]] ;
  delete socketToUser[socket.id];
})  })
inspect.on('change',(change)=>{
  console.log('inspect chnage');
  if(change.updateDescription){ if(change.updateDescription.updatedFields.requestReceived||
    change.updateDescription.updatedFields.requestSent||
    change.updateDescription.updatedFields.friends){
  status.to(userToSocket[change.fullDocument.username]).emit('updateStatus'
    ,change.fullDocument)}}
 
  })
  





// io.on('connection',(socket)=>{
//     console.log('connection established')

//     socket.on('request',(arg)=>{console.log(arg)})



// })




http.listen(3500,()=>{console.log('server Started on port 3500')})