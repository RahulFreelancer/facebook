
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

try {
    const allNoti = await Notification.findOne({username});
allNoti.newNoti=0;
await new Notification(allNoti).save();
return res.send('newNoti has been successfully reset');
} catch (e) {
    console.log(e.message);
    return res.status(501).send('error');
}


}