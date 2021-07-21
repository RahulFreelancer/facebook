import { applySession } from "next-iron-session";
import cookieInfo from "../../../utils/cookie";
import Friends from '../../../dbModel/apiFriends'

import database from "../../../utils/dbConnect";
database.connect();




export default async (req, res) => {

    await applySession(req, res, cookieInfo);
    console.log(req.session.get('user'));
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
  
const {user,otherUser} = req.body;
// console.log(user,otherUser);
try {
    const userDb= await Friends.findOne({username:user});
    const otherUserDb= await Friends.findOne({username:otherUser});
//check if friend request is still there 

const friendPresentInUserDb = userDb.friends.find((friends)=>{return friends.username===otherUser});
if(!friendPresentInUserDb){return res.status(400).send('something went wrong in recP')};
const friendPresentInOtherDb = otherUserDb.friends.find((friends)=>{
    return  friends.username===user});
if(!friendPresentInOtherDb){return res.status(400).send('something went wrong')};
//if present then push the request received obj to friends db of user
userDb.friendsCount=userDb.friendsCount-1;
otherUserDb.friendsCount=otherUserDb.friendsCount-1;
userDb.acceptedByOther=userDb.acceptedByOther.filter((friends)=>{
    friends.username!==otherUser
 })

otherUserDb.acceptedByOther=userDb.acceptedByOther.filter((friends)=>{
   friends.username!==user
})
userDb.friends=userDb.friends.filter((friends)=>{friends.username!==otherUser})

otherUserDb.friends= otherUserDb.friends.filter((friends)=>{friends.username!==user})


userDb.operationType='delete'
  otherUserDb.operationType='delete';
//saving the changes in db 
const saveOtherUser= new Friends(otherUserDb)
 await saveOtherUser.save()
 const saveUser= new Friends(userDb)
 await saveUser.save()
 return res.send('unfriend successfully')

} catch (e) {
    
    res.status(503).send(e.message)
}


  



}
