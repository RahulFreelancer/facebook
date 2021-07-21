import { applySession } from "next-iron-session";
import cookieInfo from "../../../utils/cookie";
import Friends from '../../../dbModel/apiFriends'

import database from "../../../utils/dbConnect";
import { date } from "joi";
database.connect();




export default async (req, res) => {

    await applySession(req, res, cookieInfo);
    console.log(req.session.get('user'));
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
  



    const {toUser} = req.body;
    const {fromUser} = req.body;
    const  otherUserDetail  = await Friends.findOne({username:toUser.username});
    const userDetail  = await Friends.findOne({username:fromUser.username});
    // const  otherUserDetail  = await UserDetail.findOne({username:toUser.username});
    // const userDetail  = await UserDetail.findOne({username:fromUser.username});

   otherUserDetail.requestReceived.push({
    userInfo:fromUser.id,
    fname:fromUser.fname,
    sname:fromUser.sname,
    username:fromUser.username,
     date:new Date(),
     seen:false,
    recReqNo: otherUserDetail.recReqNo+1,
  })
    otherUserDetail.recReqNo++;

  userDetail.requestSent.push({
    userInfo:toUser.id,
    fname:toUser.fname,
    sname:toUser.sname,
    username: toUser.username,
    date:new Date(),
    sentReqNo:userDetail.sentReqNo+1})
    userDetail.sentReqNo++;


const notSeenRequests=otherUserDetail.requestReceived.filter((reqs)=>{
return reqs.seen===false;

});
const notSeenAcceptedByOther = otherUserDetail.acceptedByOther.filter((reqs)=>{
  return reqs.seen===false;
})



otherUserDetail.friendsNotiCount=notSeenRequests.length+notSeenAcceptedByOther.length;
userDetail.operationType='insert';
otherUserDetail.operationType='insert';

 const saveOtherUser= new Friends( otherUserDetail)
 await saveOtherUser.save()
 const saveUser= new Friends(userDetail)
 await saveUser.save()
 

 res.send('done');



}



