import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";

import database from "../../utils/dbConnect";
import fs from "fs";
import About from "../../dbModel/apiAbout";



database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }

try {
    const about = await About.findOne({username:req.body.username}).populate('userBasicInfo','fname sname gender genderPronounce dob');
   
res.send(about);
} catch (error) {
    console.log(error.message);
}



}