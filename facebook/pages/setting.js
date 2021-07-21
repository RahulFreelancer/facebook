import { Link } from "@material-ui/core";
import { applySession } from "next-iron-session";
import { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import ChatBox from "../components/chatBox";
import MainNavBar from "../components/mainNavBar";
import styles from '../CssModules/setting.module.css'
import cookieInfo from "../utils/cookie";
import http from "../utils/http";
import NewNotification from "../utils/newNotiBadge";
import UserContext from "../utils/userContext";

const SettingAndPrivacy = ({users}) => {
   const {user,updateUser,activeUserProfile,updateActiveUserProfile}= useContext(UserContext)
   
  useEffect(async() => {
    user.username&&updateActiveUserProfile(user.username);
     try {
       const obj = await http.post("http://localhost:3000/api/getProfile/profilePhoto",
       {username:users.username})
       const cover = await http.post("http://localhost:3000/api/getProfile/getCoverPhoto",
       {username:users.username})

       // const  getArea = await http.get("http://localhost:3000/api/getProfile/getCropArea")
       updateUser(users,{img:obj.data.mainProfilePhoto},{cropImg:obj.data.cropPhoto},cover.data);
       
       
     } catch (error) {
       const result = await http.get(`${process.env.NEXT_PUBLIC_API}/logout`);
       window.location = "/";
       console.log(error)
     }
 
   }, [user]);
 
 
 
 
    

   if (!user._id) {
    return <Skeleton count={5} />;
  }
 

    return ( <>
    <MainNavBar/>
    <ChatBox/>
    <NewNotification/>
    <div className={styles.mainDiv}>
        <div className={styles.mainDivOne}>
            <div className={styles.generalSettingHeading}>
                <span>General Account Setting</span>
            </div>
           {/* name */}
            <div className={styles.generalSettingDetails}>
              <div className={styles.generaSettingButton}>
               <div className={styles.settingButtonFirstCol}>
                <span>Name</span>
               </div>
               <div className={styles.settingButtonSecAndThirdCol}>
               <span className={styles.colValue}>{user.fname+' '+user.sname}</span>
               <span className={styles.editCol}>Edit</span>
               </div>
              </div>
            </div>

            {/* email */}

            <div className={styles.generalSettingDetails}>
              <div className={styles.generaSettingButton}>
               <div className={styles.settingButtonFirstCol}>
                <span>Contact</span>
               </div>
               <div className={styles.settingButtonSecAndThirdCol}>
               <span className={styles.colValue}>{user.email}</span>
               {/* <span className={styles.editCol}>Edit</span> */}
               </div>
              </div>
            </div>

{/* gender */}

<div className={styles.generalSettingDetails}>
              <div className={styles.generaSettingButton}>
               <div className={styles.settingButtonFirstCol}>
                <span>Gender</span>
               </div>
               <div className={styles.settingButtonSecAndThirdCol}>
               <span className={styles.colValue}>{user.gender}</span>
               <Link href={`/${user.username}/about_contact_and_info`}><span  className={styles.editCol}>Edit</span></Link> 
               </div>
              </div>
            </div>


            {/* dob */}

            <div className={styles.generalSettingDetails}>
              <div className={styles.generaSettingButton}>
               <div className={styles.settingButtonFirstCol}>
                <span>Date Of Birth</span>
               </div>
               <div className={styles.settingButtonSecAndThirdCol}>
               <span className={styles.colValue}>{`${user.dob.day} 
               ${user.dob.month} ${user.dob.year}`}</span>
              <Link href={`/${user.username}/about_contact_and_info`}><span  className={styles.editCol}>Edit</span></Link> 
               </div>
              </div>
            </div>

{/* username */}


<div className={styles.generalSettingDetails}>
              <div className={styles.generaSettingButton}>
               <div className={styles.settingButtonFirstCol}>
                <span>Username</span>
               </div>
               <div className={styles.settingButtonSecAndThirdCol}>
               <span className={styles.colValue}>{user.username}</span>
               {/* <span className={styles.editCol}>Edi</span> */}
               </div>
              </div>
            </div>


        </div>
    </div>
   </>);
}
export async function getServerSideProps({ req, res }) {
    await applySession(req, res,cookieInfo);
    const users = req.session.get("user") ? req.session.get("user") : false;
    console.log(req.url);
    if (!users) {
      res.setHeader("location", "/");
      res.statusCode = 302;
      res.end();
    }
  
    return {
      props: {
        users,
      },
    };
  }
export default SettingAndPrivacy;