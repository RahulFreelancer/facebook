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

    const {total} = req.query;
const {activeUserProfile,username}=req.body;
if (total){
    try {
        const friends = await Friends.findOne({username:activeUserProfile});   
    return res.send(friends.friendsCount);
       
    } catch (e) {
        console.log(e.message);
        return res.status(400).send('badrequest')
    }
    
}




try {
    const activeUserDb = await Friends.findOne({username:activeUserProfile}).populate(`requestSent.userInfo requestReceived.userInfo friends.userInfo acceptedByOther.userInfo,username fname sname _id`);
    const userDb= await Friends.findOne({username:username}).populate(`requestSent.userInfo requestReceived.userInfo friends.userInfo acceptedByOther.userInfo,username fname sname _id`);


const mappedToRelation=activeUserDb.friends.map((filterFriend)=>{
userDb.friends.find((friend)=>{friend.username===filterFriend.username&&(filterFriend.relation={friends:"yes"})});
userDb.requestSent.find((reqs)=>{reqs.username===filterFriend.username&&(filterFriend.relation={requested:"yes"})});
userDb.requestReceived.find((reqs)=>{reqs.username===filterFriend.username&&(filterFriend.relation={respond:"yes"})});
userDb.username===filterFriend.username&&(filterFriend.relation={self:"yes"})
!filterFriend.relation&&(filterFriend.relation={notFriend:"yes"})
return filterFriend;
})

// console.log(mappedToRelation);
    return res.send(mappedToRelation);
} catch (e) {
    console.log(e.message);
}




}