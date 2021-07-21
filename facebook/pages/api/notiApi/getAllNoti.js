
import { applySession } from "next-iron-session";
import Notification from "../../../dbModel/apiNotification";
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";



database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
const {username}=req.body;
console.log(req.query);
try {
    const allNoti = await Notification.findOne({username}).populate('notifications.userInfo','username fname sname')
if(req.query.newNoti){return res.send(allNoti.newNoti)}
    return res.send(allNoti.notifications);
} catch (e) {
    console.log(e.message);
    return res.status(501).send('error');
}


}