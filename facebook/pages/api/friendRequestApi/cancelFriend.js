import { applySession } from "next-iron-session";
import cookieInfo from "../../../utils/cookie";



import database from "../../../utils/dbConnect";
import Friends from "../../../dbModel/apiFriends";


database.connect();




export default async (req, res) => {

    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
  



    
    const {toUser} = req.body;
    const {fromUser} = req.body;
    const  otherUserDetail  = await Friends.findOne({username:toUser.username});
    const userDetail  = await Friends.findOne({username:fromUser.username});
    // const otheUserIndex= otherUserDetail.requestReceived.indexOf(req.body.from);
    // const userIndex=userDetail.requestSent.indexOf(req.body.to);
  // otherUserDetail.requestReceived.splice(otheUserIndex,1)
  // userDetail.requestSent.splice(userIndex,1);
otherUserDetail.requestReceived=otherUserDetail.requestReceived.filter(reqs=>
  {reqs.username!==fromUser.username})
userDetail.requestSent=userDetail.requestSent.filter(reqs=>
  {reqs.username!==toUser.username})




  // const notSeenRequests=userDetail.requestReceived.filter((reqs)=>{
  //   reqs.seen===false
  // });
  // const notSeenAcceptedByOther=userDetail.acceptedByOther.filter((reqs)=>{
  //   reqs.seen===false;
  // })
 
  // userDetail.friendsNotiCount=
  // notSeenRequests.length+notSeenAcceptedByOther.length;

  userDetail.operationType='delete'
otherUserDetail.operationType='delete';
 const saveOtherUser= new Friends(otherUserDetail)
 await saveOtherUser.save()
 const saveUser= new Friends(userDetail)
 await saveUser.save()
 res.send('done');



}

