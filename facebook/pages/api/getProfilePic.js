import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";
import UserDetail from "../../dbModel/apiUserDetail";
import database from "../../utils/dbConnect";
import fs from "fs";


database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }

 
    // console.log(req.query,'adslfjalsdfjalasdlfjlasdj')
  let user;
  // console.log(req.query);
try {
 
 let userid=req.query.id||req.query.username;
  user = await UserDetail.findOne({ username: userid });



  const cropimgPath = user.cropProfilePhoto || user.defaultProfilePhoto;
  const cropimgData = fs.readFileSync(cropimgPath);   
// res.statusCode = 200;
// res.setHeader("Content-Type", "image/jpeg");
  return res.send(cropimgData);
} catch (error) {
  if (error.path === user.cropProfilePhoto) {
    return res.status(400).send("cant find this image");
  }
  return res.status(500).send("internal server error hui h");
  
}



}