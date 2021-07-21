import multer from "multer";
import { applySession } from "next-iron-session";
import cookieInfo from "../../../utils/cookie";
import nc from "next-connect";
import bodyParser from "body-parser";
import fs from "fs";
import UserDetail from "../../../dbModel/apiUserDetail";
import database from "../../../utils/dbConnect";

// import cors from "cors";
const handler = nc();

export const config = {
  api: {
    bodyParser: false,
  },
};
//connect to database
database.connect();
async function addProfilePhoto(req, res) {
  let path = "";

  upload.fields([ { name: 'photu', maxCount: 1 },
  { name: 'cropPhotu', maxCount: 1 }])(req, res, async () => {
   
  
    
    //finding and changing userprofilepic

    try {
      const user = await UserDetail.findOne({ _id: userId });
      user.photos.push( req.files.photu[0].path);
      user.allProfilePhotos.push( req.files.photu[0].path);
      user.profilePhoto = req.files.photu[0].path
      user.cropProfilePhoto=req.files.cropPhotu[0].path;

      const saveInfo = new UserDetail(user);
      await saveInfo.save();
      res.end();
    } catch (error) {
      console.log(error);
      return res.status(500).send("internal server error");
    }
  });

  return;
}

// async function addCropAreaOfDp(req,res){
// try {
//   const user = await UserDetail.findOne({ _id: userId });
//   user.cropAreaOfDp=req.body;
//   const saveUser = new UserDetail(user);
//   await saveUser.save()
//  return res.send('cropped area saved successfully ')
// } catch (error) {
//  return  res.status(501).send('internal server error')
// }

// }





function addCoverPhoto(req, res) {

  upload.fields([ { name: 'coverPhoto', maxCount: 1 }])(req, res, async () => {
   
  
    
    //finding and changing userprofilepic

    try {
      const user = await UserDetail.findOne({ _id: userId });
      user.photos.push( req.files.coverPhoto[0].path);
      user.allProfilePhotos.push( req.files.coverPhoto[0].path);
 user.coverPhoto=req.files.coverPhoto[0].path;

      const saveInfo = new UserDetail(user);
      await saveInfo.save();
      res.end();
    } catch (error) {
      console.log(error);
      return res.status(500).send("internal server error");
    }
  });

  return;
}






function addAboutDetails(req, res) {}

function addEducationDetails(req, res) {}

// handler.use(cors());
handler.use(bodyParser.json());
handler.use(bodyParser.urlencoded({ extended: true }));
handler.use(async (req, res, next) => {
  await applySession(req, res, cookieInfo);
  if (!req.session || !req.session.get("user")) {
    console.log("ye nhi ho skta bhai");
    return res.status(403).send("cant");
  }
  global.userId = req.session.get("user")._id;
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = req.session.get("user")._id;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let date = new Date();

    cb(
      null,
      date.toDateString() + " " + date.getTime() + " " +
      file.fieldname+file.originalname
    );
  },
});

const upload = multer({ storage });

// const upload = multer({ dest: "./uploadss/" });

handler.post(async (req, res) => {
  const { params } = req.query;

  // return res.send("sdf");
  switch (params) {
    case "profilePhoto": {
      return addProfilePhoto(req, res);
    }
// case "cropAreaOfDp":{
//   return addCropAreaOfDp(req,res);
// }


    case "coverPhoto": {
      return addCoverPhoto(req, res);
    }
  }
});

export default handler;
