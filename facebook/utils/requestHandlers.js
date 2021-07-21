
import http from "./http";


    


  export const sendFriendRequest=async(user,otherProfileUser)=>{
        (true);
     try {
       const {data} =await http.post('/api/friendRequestApi/addFriend',
       {fromUser:{username:user.username,id:user._id,fname:user.fname,sname:user.sname},
       toUser:{username:otherProfileUser.username,id:otherProfileUser._id ,
        fname:otherProfileUser.fname,sname:otherProfileUser.sname}})
       console.log(data);
       // updateRelationWithProfileUser({});
       //  (false)
     } catch (e) {
       console.log(e.message)
     }
     }
 export const cancelFriendRequest=async(user,otherProfileUser)=>{
        (true)
     
       try {
         const {data} = await http.post('/api/friendRequestApi/cancelFriend',
         {fromUser:{username:user.username},
         toUser:{username:otherProfileUser.username,}})
         console.log(data);
         // updateRelationWithProfileUser({});
        
       } catch (e) {
         console.log(e.message)
     }
     }


 export const confirmRequest=async(user,otherProfileUser)=>{
        (true);
       try {
         const {data} =await http.post('/api/friendRequestApi/acceptRequest',
         {user:user.username,
         otherUser:otherProfileUser.username,})
         console.log(data);

         // updateRelationWithProfileUser({});
         //  (false)
       } catch (e) {
         if (e.response && e.response.data) {
           console.log(e.response.data) // some reason error message
         }
         console.log(e)
       }
     }

   export const deleteRequest=async(user,otherProfileUser)=>{
        (true)

       try {
         const {data} = await http.post('/api/friendRequestApi/deleteRequest',
         {mainUser:user.username,otherUser:otherProfileUser.username})
         console.log(data);
         // updateRelationWithProfileUser({});
        
       } catch (e) {
         console.log(e.message)
     }
     }

     export const unfriend=async(user,otherProfileUser)=>{
        (true);
       try {
         const {data} =await http.post('/api/friendRequestApi/unfriend',
         {user:user.username,
         otherUser:otherProfileUser.username,})
         console.log(data);

         // updateRelationWithProfileUser({});
         //  (false)
       } catch (e) {
         if (e.response && e.response.data) {
           console.log(e.response.data) // some reason error message
         }
         console.log(e)
       }
     }

 

        

        


      
      
     