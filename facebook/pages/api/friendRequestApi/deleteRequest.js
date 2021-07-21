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



    
    const {otherUser} = req.body;
    const {mainUser} = req.body;


    try {
        
        const  otherUserDetail  = await Friends.findOne({username:otherUser});
        const userDetail  = await Friends.findOne({username:mainUser});
      
    otherUserDetail.requestSent=otherUserDetail.requestSent.filter(reqs=>
      {reqs.username!==mainUser})
    userDetail.requestReceived=userDetail.requestReceived.filter(reqs=>
      {reqs.username!==otherUser})
    
 
    
    
      const notSeenRequests=userDetail.requestReceived.filter((reqs)=>{
        return reqs.seen===false;
      });
      const notSeenAcceptedByOther=userDetail.acceptedByOther.filter((reqs)=>{
        return reqs.seen===false;
      })
      
      userDetail.friendsNotiCount=
      notSeenRequests.length+notSeenAcceptedByOther.length;
      userDetail.operationType='delete'
    otherUserDetail.operationType='delete';
    
     const saveOtherUser= new Friends(otherUserDetail)
     await saveOtherUser.save()
     const saveUser= new Friends(userDetail)
     await saveUser.save()
     res.send('done');
    



    } catch (e) {
        res.status(400).end();
        console.log(e.message)
    }
    



}