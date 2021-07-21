import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";
import Friends from '../../dbModel/apiFriends';
import database from "../../utils/dbConnect";
import fs from "fs";


database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }

    // const {requiredNo} = req.query;
const {activeUserProfile}=req.body;

    try {
        const friendsDb = await Friends.findOne({username:activeUserProfile}).populate(`requestSent.userInfo requestReceived.userInfo friends.userInfo acceptedByOther.userInfo,username fname sname _id`);;
        let n = 0 ;
        let nineFriend = [];
while (n<=9){
    if(n===9){n=0;break;}
    if(friendsDb.friends[n]){
        nineFriend.push(friendsDb.friends[n]);
    }
n++
}
 
return res.send(nineFriend);
    } catch (e) {
        console.log(e.message);
        return res.status(400).send('badrequest')
    }
}
