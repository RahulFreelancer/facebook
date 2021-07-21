import Users from "../../dbModel/apiRegister";
import database from "../../utils/dbConnect";
import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";

export default async (req, res) => {
  database.connect();
  await applySession(req, res, cookieInfo);
  if (!req.session || !req.session.get("user")) {
    return res.status(403).send("unathorized");
  }
  try {
    const result = await Users.findOne({ username: req.body.username });
    if (!result) {
     return  res.status(400).send('notFound');
    }
    return res.send(result);
  } catch (error) {
    res.status(400).end();
    console.log("not found");
  }
};
