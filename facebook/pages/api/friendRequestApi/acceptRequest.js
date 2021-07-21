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

const recPresent = userDb.requestReceived.find((reqs)=>{return reqs.username===otherUser});
if(!recPresent){return res.status(400).send('something went wrong in recP')};
const sentPresent = otherUserDb.requestSent.find((reqs)=>{return reqs.username===user});
if(!sentPresent){return res.status(400).send('something went wrong')};
//if present then push the request received obj to friends db of user
recPresent.friendNo=++userDb.friendsCount
recPresent.date=new Date()
recPresent.relation={};
userDb.friends.push(recPresent);
userDb.requestReceived=userDb.requestReceived.filter((reqs)=>{return reqs.username!==otherUser})

sentPresent.seen=false;
sentPresent.friendNo=++otherUserDb.friendsCount
sentPresent.date= new Date()
sentPresent.relation={};
otherUserDb.acceptedByOther.push(sentPresent);
otherUserDb.friends.push(sentPresent);
otherUserDb.requestSent= otherUserDb.requestSent.filter((reqs)=>{return reqs.username!==user})
//saving the changes in db 




const userDbNotSeenRequests=userDb.requestReceived.filter((reqs)=>{
    return reqs.seen===false;
  });
  const userdbNotSeenAcceptedByOther=userDb.acceptedByOther.filter((reqs)=>{
    return reqs.seen===false;
  })
  
  userDb.friendsNotiCount=
  userDbNotSeenRequests.length+userdbNotSeenAcceptedByOther.length;

  const notSeenRequests=otherUserDb.requestReceived.filter((reqs)=>{
    return reqs.seen===false;
  });
  const notSeenAcceptedByOther=otherUserDb.acceptedByOther.filter((reqs)=>{
    return reqs.seen===false;
  })
  
  otherUserDb.friendsNotiCount=
  notSeenRequests.length+notSeenAcceptedByOther.length;


userDb.operationType='delete'
  otherUserDb.operationType='insert';
const saveOtherUser= new Friends(otherUserDb)
 await saveOtherUser.save()
 const saveUser= new Friends(userDb)
 await saveUser.save()
 return res.send('now we are friends ')

} catch (e) {
    console.log(e.message);
    res.status(503).send(e.message)
}


  



}



