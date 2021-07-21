import { applySession } from "next-iron-session";
import NewsFeed from "../../../dbModel/apiNewsFeed";
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
    const newsFeed= await NewsFeed.findOne({username});
    console.log(newsFeed);
    return res.send(newsFeed.latestFeed);
} catch (error) {
    console.log(error.message)
    return res.status(501).send('error')
}

}