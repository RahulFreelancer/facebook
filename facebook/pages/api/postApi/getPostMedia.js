import { applySession } from "next-iron-session";
import database from "../../../utils/dbConnect";
import fs from "fs";
import cookieInfo from "../../../utils/cookie";


database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }

 
    // console.log(req.query,'adslfjalsdfjalasdlfjlasdj')

  // console.log(req.query);
try {
 
const {path}=req.query
  const myMedia= fs.readFileSync(path);   
  return res.send(myMedia);
} catch (error) {
  return res.status(500).send("internal server error hui h");
}



}