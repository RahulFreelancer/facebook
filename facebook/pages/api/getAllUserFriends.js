import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";
import Friends from '../../dbModel/apiFriends';
import database from "../../utils/dbConnect";


database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }

const {username}=req.body;
try {
    const userDb= await Friends.findOne({username:username}).populate(`requestSent.userInfo requestReceived.userInfo friends.userInfo acceptedByOther.userInfo,username fname sname _id`);
    return res.send(userDb.friends);
} catch (e) {
    console.log(e.message);
}




}