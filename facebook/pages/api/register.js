import Users from "../../dbModel/apiRegister";
import database from "../../utils/dbConnect";
import Joi from "joi";

import bcrypt from "bcrypt";
import { withIronSession } from "next-iron-session";
import UserDetail from "../../dbModel/apiUserDetail";
import cookieInfo from "../../utils/cookie";
import Friends from "../../dbModel/apiFriends";
import About from "../../dbModel/apiAbout";
import Posts from "../../dbModel/apiPosts";
import NewsFeed from "../../dbModel/apiNewsFeed";
import Notification from "../../dbModel/apiNotification";
import apiChat from "../../dbModel/apiChat";


const schemaObj = {
  fname: Joi.string().required().min(3).max(20).label("First name"),
  sname: Joi.string().required().max(20).label("Surname"),
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(8).label("password"),
  cpassword: Joi.string().label("Confirm password"),
  year: Joi.number().required().max(2015).label("Date of birth"),
  gender: Joi.string().required().label("Gender"),
};

const schema = Joi.object(schemaObj);

const Validation = (user) => {
  if (user.email) {
    user.email = user.email.toLowerCase();
  }
  user.fname = user.fname.trim();
  user.sname= user.sname.trim();
console.log(user.sname);
  delete user.month;
  delete user.day;

  const option = { abortEarly: false };
  return schema.validate(user, option);
};

export const Register = async (req, res) => {
  //making connection  to database
  database.connect();
  const day = req.body.day;
  const month = req.body.month;
  //validating the body of request
  const { error } = Validation(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  /*assingning the day,month,year as  properties of dob object inside the
 received user object and removing them as properties of user object*/
  req.body.dob = {
    day: day,
    month: month,
    year: req.body.year,
  };
  delete req.body.day;
  delete req.body.month;
  delete req.body.year;

  //checking if user already registered with this email
  try {
    //database call
    const isPresent = await Users.findOne({ email: req.body.email });
    //checking
    if (isPresent) {
      return res.status(403).send("User Already Registered");
    }
  } catch (e) {
    console.log(
      "Can not check for email because there is no connection to the databse"
    );
    return res.status(501).send("Internal Server Error Occurred");
  }

  //registering user into  allUser collection

  console.log(req.body);
  const user = new Users(req.body);
  user.username = user.fname + user.sname + user._id;


  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  //registering user into usersdetail collection
  const userDetail = new UserDetail({

    _id: user._id,
    username:user.username,
    profilePhoto: "",
    defaultProfilePhoto: "defaultProfilePhoto\\avatar.png",
    defaultCoverPhoto:"defaultCoverPhoto\\coverAvtar.jpg",
    about: {
      name: `${user.fname} ${user.sname}`,
      email: user.email,
      dob: { ...user.dob },
      gender: user.gender,
    },
    education: { school: "", college: "" },
    coverPhoto: "",
  });

const friends = new Friends({
  _id:user._id,
username:user.username,
requestSent:[],
  requestReceived:[],
  friends:[],
  sentReqNo:0,
  recReqNo:0,
  friendsCount:0,})
  
  const about = new About({
    _id:user._id,
  username:user.username,
  workAndEdu:{work:{audience:''},
university:{audience:''},
highSchool:{audience:''}},
  placeLived:{current:{audience:''},
hometown:{audience:''},
},
userBasicInfo:user._id,
  contactAndBasicInfo:{
    address:{audience:''},
language:{audience:''},
dob:{audience:'public'},
},
  familyAndRel:{relationship:{audience:''}},
  details:{aboutProfileUser:{audience:''}}})
  
const posts = new Posts({_id:user._id,username:user.username,posts:[]})
const newsFeed = new NewsFeed({_id:user._id,username:user.username,latestFeed:[]})
const noti = new Notification({_id:user._id,username:user.username,notifications:[],newNoti:0})
const chat = new apiChat({_id:user._id,username:user.username,newMsgNoti:0,allChats:[]})
  try {
    const result = await user.save();
    await about.save();
    await friends.save();
    await userDetail.save();
    await posts.save();
    await newsFeed.save();
    await noti.save();
    await chat.save();
    
  
    req.session.set("user", user);
    await req.session.save();
    return res.send(result);
  } catch (e) {
    console.log(
      "Can not save into database because there is no connection to the databse"
    );
    console.log(e.message)
    return res.status(501).send("Internal Server Error Occurred");
  }
};

export default withIronSession(Register,cookieInfo);
