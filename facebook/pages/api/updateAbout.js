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

    const {username,obj,arg1,arg2} = req.body
    console.log(req.body);
try {
    const about = await About.findOne({username}).populate('userBasicInfo','fname sname gender genderPronounce dob');
  
    about[arg1][arg2]=obj;
    console.log(about)
   
    const newAbout = new About(about);
    await newAbout.save();
    res.send(about);
} catch (error) {
    res.status(400).send('bad req');
}




}