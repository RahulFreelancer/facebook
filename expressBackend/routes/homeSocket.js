const NewsFeed = require('../dbModels/apiNewsFeed')


module.exports = function(io) {
    const optionObjHome = { fullDocument: 'updateLookup' };
      
  const inspectNewsFeed = NewsFeed.watch(optionObjHome)

    let socketToUserNewsFeed={};
    let userToSocketNotiNewsFeed={};
    const homeSocket=io.of("/expressApi/homeSocket");
    homeSocket.use((socket,next)=>{
 
        if(!socket.handshake.auth.token){
          const err = new Error("not authorized");
          err.data = { content: "Please retry later" }; // additional details
          next(err);
          return;
        }
        else{
          next()}
      })


      homeSocket.on('connection',async(socket)=>{
          console.log('homeSocket connection');
      
          socketToUserNewsFeed[socket.id]=socket.handshake.auth.username;
          userToSocketNotiNewsFeed[socket.handshake.auth.username]=socket.id;

         socket.on('disconnect',()=>{
           delete userToSocketNotiNewsFeed[socketToUserNewsFeed[socket.id]] ;
           delete socketToUserNewsFeed[socket.id];
         })
      })

  
        
     inspectNewsFeed.on('change',(change)=>{
        
//   console.log(socketToUserNewsFeed[change.fullDocument.username]);
        if(change.fullDocument&&change.updateDescription){
           homeSocket.to(userToSocketNotiNewsFeed[change.fullDocument.username]).emit('receiveNewsFeed'
              ,{latestFeed:change.fullDocument.latestFeed})
          
        }
      })



    

};