import { applySession } from "next-iron-session";
import cookieInfo from "../../utils/cookie";
import database from "../../utils/dbConnect";

import Users from "../../dbModel/apiRegister";
import About from "../../dbModel/apiAbout";


database.connect();


async function updateGender(req,res){
const {username,obj}=req.body

    try {
        // updating gender in userdb collection
        const user = await Users.findOne({username});
 
        user.gender=obj.gender;
        user.genderPronounce=obj.genderPronounce;
        const newUser = new Users(user);
        await newUser.save();

// populating gender and send back to user from about collection


const about = await About.findOne({username}).populate('userBasicInfo','fname sname gender genderPronounce dob')

return res.send(about);


    } catch (error) {
        res.status(400).send('bad request');
        console.log(error.message);
    }


}


export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }

  const {gender,dob,fullname}=req.query;
if(gender)return updateGender(req,res);
console.log('it is al srun dsaflsdjf ads')
dob&&updateDob(req,res);
fullname&&updateFullname(req,res);
  
}