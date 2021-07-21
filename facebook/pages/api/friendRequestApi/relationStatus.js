import { applySession } from "next-iron-session";
import cookieInfo from "../../../utils/cookie";
import Friends from '../../../dbModel/apiFriends';

import database from "../../../utils/dbConnect";
// import fs from "fs";
// import path from 'path';
database.connect();




export default async (req, res) => {

    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
  


if(!req.body.username){return res.send('try again')};
    const result  = await Friends.findOne({username:req.body.username});
 
    
   
   const friend = result.friends.find((reqs)=>{return reqs.username===req.body.otherUsername?
'yes':null;
});
const requested=
result.requestSent.find((reqs)=>{return reqs.username===req.body.otherUsername?
    'yes':null;
    });
const respond = result.requestReceived.find((reqs)=>{return reqs.username===req.body.otherUsername?
'yes':null });



    // res.send({notFriend:'yes'});
    friend&&res.send({friends:"yes"})
    requested&&res.send({requested:"yes"})
    respond&&res.send({respond:'yes'})
    !requested&&!friend&&!respond&&res.send({notFriend:"yes"})
}



