import { applySession } from "next-iron-session";
import cookieInfo from "../../../utils/cookie";
import UserDetail from "../../../dbModel/apiUserDetail";
import User from '../../../dbModel/apiRegister';

import database from "../../../utils/dbConnect";
import fs from "fs";
import path from 'path';
database.connect();



// async function getCropArea(req,res){

//   try {
//     const userid = req.session.get("user")._id;
//     const user = await UserDetail.findOne({_id:userid});
//     return res.send(user.cropAreaOfDp);
//   } catch (error) {
//     res.status(501).send('internal server error during getting cropped area')
//   }
  

// }

async function getUser(req,res){
  const username = req.body.username;
  
let user;
  try {
    user = await User.findOne({ username });
    return res.send(user);
  } catch (error) {
    res.status(400).send('no user found');
  }

}


async function  getCropProfilePhoto(req,res){
  let user;
try {
  const userid = req.session.get("user")._id;
   
  user = await UserDetail.findOne({ _id: userid });

  const cropimgPath = user.cropProfilePhoto;
  const cropimgData = fs.readFileSync(cropimgPath,{encoding:"base64"});
  const cropextName = path.extname(cropimgPath);
  const cropfinalImg = `data:image/${cropextName.split('.').pop()};base64,${cropimgData}`
  return res.send(cropfinalImg);
} catch (error) {
  if (error.path === user.cropProfilePhoto) {
    return res.status(400).send("cant find this image");
  }
  return res.status(500).send("internal server error hui h");
  
}




}




async function getProfilePhoto(req, res) {
  
  
  let user;
  let cropfinalImg;
  try {
    const username = req.body.username;
   
    user = await UserDetail.findOne({username});
    let imgPath = user.profilePhoto || user.defaultProfilePhoto;
  
    if(user.cropProfilePhoto){
      console.log('yes present')
      const cropimgPath = user.cropProfilePhoto;
      const cropimgData = fs.readFileSync(cropimgPath,{encoding:"base64"});
      const cropextName = path.extname(cropimgPath);
      cropfinalImg = `data:image/${cropextName.split('.').pop()};base64,${cropimgData}`
    }

    const imgData = fs.readFileSync(imgPath,{encoding:"base64"});

    const extName = path.extname(imgPath);
    const mainProfilePhoto = `data:image/${extName.split('.').pop()};base64,${imgData}`
    return res.send({mainProfilePhoto,cropPhoto:cropfinalImg||null});
    // res.writeHead(200, { "Content-Type": "image/jpeg" });
  
    // const b64 = new Buffer.from(imgData).toString('base64');
    
 

  } catch (error) {
    if (error.path === user.profilePhoto) {
      return res.status(400).send("cant find this image");
    }
    return res.status(500).send("internal server error hui h");
  }
}


async function getAllProfilePhotosList(req,res){
    try {
      
        const userid = req.session.get("user")._id;
       
        const user = await UserDetail.findOne({ _id: userid });
   
        return res.send(user.allProfilePhotos);
    } catch (error) {
     return res.status(401).send('bad request ki h tumne')
    }
}



async function getAllProfilePhotos(req,res){
  console.log('here we comes')
       const {imgPath}=req.query;
       console.log(imgPath);

       try{
       const imgData = fs.readFileSync(imgPath, (err, data) => {
        if (err) {
          throw new Error();
        }
      });
      return res.send(imgData);
    } catch (error) {
      
      return res.status(500).send("internal server error hui h");
    }
}





async function getCoverPhoto(req, res) {
   
  let user;
  const username = req.body.username;
  try {
  
   
    user = await UserDetail.findOne({username});
    let imgPath = user.coverPhoto || user.defaultCoverPhoto;
    
    const imgData = fs.readFileSync(imgPath,{encoding:"base64"});
    const extName = path.extname(imgPath);
    const mainCoverPhoto = `data:image/${extName.split('.').pop()};base64,${imgData}`
    return res.send(mainCoverPhoto);
    // res.writeHead(200, { "Content-Type": "image/jpeg" });
  
    // const b64 = new Buffer.from(imgData).toString('base64');
    
 

  } catch (error) {
    if (error.path === user.coverPhoto) {
      return res.status(400).send("cant find this image");
    }
    return res.status(500).send("internal server error hui h");
  }





}

function getAboutUser(req, res) {
  return res.send("this is all about me ");
}
function getEducation(req, res) {
  return res.send("i am an educated person ");
}




// async function getOtherUserProfileData(req,res){
//  const id = req.body.userid;
//  try {
//   const user = await User.findOne({_id:id});
//   res.send(user);
//  } catch (error) {
//    res.status(400).send('error hui h ')
//  }


// }









export default async (req, res) => {
  await applySession(req, res, cookieInfo);
  if (!req.session || !req.session.get("user")) {
    return res.status(403).send("unathorized");
  }
  const { params } = req.query;
  console.log(req.query);
  // console.log(params);
  switch (params) {

case "getUser":{
  return getUser(req,res);
}


    case "profilePhoto": {
      return getProfilePhoto(req, res);
    }
   
    case "cropProfilePhoto": {
      return getCropProfilePhoto(req, res);
    }

    // case "getCropArea" :{
    //   return getCropArea(req,res);
    // }

    case "getAllProfilePhotosList":{
      return getAllProfilePhotosList(req,res)
    }
 
    case "getAllProfilePhotos":{
      return getAllProfilePhotos(req,res);
    }

    case "getCoverPhoto": {
      return getCoverPhoto(req, res);
    }

    case "aboutUser": {
      return getAboutUser(req, res);
    }

    case "education": {
      return getEducation(req, res);
    }

    // case "getOtherUserProfileData":{
    //   return getOtherUserProfileData(req,res);
    // }

    default: {
      return res.status(400).end();
    }
  }
};
