import { applySession } from "next-iron-session";
import cookieInfo from "../../../utils/cookie";
import Friends from '../../../dbModel/apiFriends'

import database from "../../../utils/dbConnect";
database.connect();


const removeSeenAccepted= async(req,res)=>{

    try {
const friends = await Friends.findOne({username:req.body.username});
friends.acceptedByOther=friends.acceptedByOther.filter((friend)=>{
    friend.username!==req.body.acceptedUsername});
    const userDbNotSeenRequests=friends.requestReceived.filter((reqs)=>{
        return reqs.seen===false;
      });
      const userdbNotSeenAcceptedByOther=friends.acceptedByOther.filter((reqs)=>{
        return reqs.seen===false;
      })

     friends.friendsNotiCount=
      userDbNotSeenRequests.length+userdbNotSeenAcceptedByOther.length;
friends.operationType='delete';
const saveFriends = new Friends(friends);
await saveFriends.save();

return res.end()

    } catch (error) {
        console.log(error.message);
    }
}


const seenRecReqs=async(req,res)=>{

    try {
        const friends = await Friends.findOne({username:req.body.username});
       const foundReq=friends.requestReceived.find((reqs)=>{
          reqs.username===req.body.receivedUsername?(reqs.seen=true):null});
       
          console.log(friends.requestReceived);
      
// if(foundReq){
//     friendsj
//     foundReq.seen=false; // console.log(friends);
// }

          const userDbNotSeenRequests=friends.requestReceived.filter((reqs)=>{
                return reqs.seen===false;
              });
              const userdbNotSeenAcceptedByOther=friends.acceptedByOther.filter((reqs)=>{
                return reqs.seen===false;
              })
        
             friends.friendsNotiCount=
              userDbNotSeenRequests.length+userdbNotSeenAcceptedByOther.length;
        friends.operationType='delete';
        const saveFriends = new Friends(friends);
        await saveFriends.save();
        
        return res.send('it is working')
        
            } catch (error) {
                console.log(error.message);
            }


}




export default async (req, res) => {

    await applySession(req, res, cookieInfo);
    console.log(req.session.get('user'));
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
const {acceptedUsername,receivedUsername}=req.body;

if(acceptedUsername){
    return  removeSeenAccepted(req,res)
}

if(receivedUsername){
    return seenRecReqs(req,res);
}
}