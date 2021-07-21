import UserContext from "../utils/userContext";
import { applySession } from "next-iron-session";
import http from "../utils/http";
const { useContext, useEffect, useState } = require("react");
import { useRouter } from "next/router";

import {useCookies} from 'react-cookie'
import axios from "axios";
import Posts from "../components/posts";
import About from "../components/about";
import Friends from "../components/friends";
import Photos from "../components/photos";
import Skeleton from "react-loading-skeleton";
import MainNavBar from "../components/mainNavBar";
import CoverAndDpContainer from "../components/coverAndDpContainer";
import styles from '../CssModules/userProfile.module.css';
import Cookies from 'js-cookie';
import {io} from 'socket.io-client';
import cookieInfo from "../utils/cookie";
import AllDetail from "../components/allDetailOfUser";
import LightStoreContext from "../utils/lightStoreContext";
import definedRoutes from "../utils/definedRoutes";
import ChatBox from "../components/chatBox";
import NewNotification from "../utils/newNotiBadge";




const Profile = ({ users }) => {

 
 

  const { user, updateUser, updateActiveUserProfile,activeUserProfile, } = useContext(UserContext);

  const {getAndUpdateTotalFriends,about,updateAbout}=useContext(LightStoreContext);
  const router = useRouter();
  const {userProfile } = router.query;

// console.log('rerendring')

  useEffect(()=>{
user.username&&updateActiveUserProfile(user.username);
user.username&&getAndUpdateTotalFriends(user.username);
  },[user.username])

  useEffect(async()=>{
    try {
      const {data} = await http.post('http://localhost:3000/api/getAboutUser',
      {username:activeUserProfile})
     
  updateAbout(data);
  
    } catch (e) {
      console.log(e.message);
    }
  },[activeUserProfile])
  

  useEffect(async () => {
  


    if (!user._id) {
  
      if(users.username!==userProfile[0])
      {
    return router.push(`/profile/${userProfile[0]}`)
  } 
  if(userProfile[1]){
    const isValidPath = definedRoutes.find((route)=>route===userProfile[1]);
    !isValidPath&&router.replace("/notFound")}
  // if(userProfile[1]&&(userProfile[1]!=='posts' 
  // && userProfile[1]!=='about' && userProfile[1]!== 'friends' 
  // && userProfile[1]!== 'photos' && userProfile[1]!== 'videos')){
    //   return window.location="/"+userProfile[0}
      try {
        
       
    const obj = await http.post("http://localhost:3000/api/getProfile/profilePhoto",
    {username:users.username});
    const cover = await http.post("http://localhost:3000/api/getProfile/getCoverPhoto",
    {username:users.username})
  
updateUser(users,{img:obj.data.mainProfilePhoto},
  {cropImg:obj.data.cropPhoto},cover.data);
 

      } catch (error) {
        return router.replace("/notFound");
      }
    }
    

    
    
  }, [userProfile[0]]);

  // console.log(user);



  if (!user._id) {
    return <Skeleton count={10} />;
  }
  const isNavLinkActive=(definedRoute)=>{
    // let fullPath = router.asPath.split('/');
    const lastRoute = router.asPath.split('/').pop();
    const firstStringOfLastRoute=lastRoute.split('_').shift();
  
  return definedRoute===firstStringOfLastRoute?true:null
  }
  return (
    <>
    <MainNavBar/>
<ChatBox/>
<NewNotification/>
       <CoverAndDpContainer/>
      
       <div className={styles.aroundMainBox}>
       <div className={styles.mainBox}>
       {isNavLinkActive('about') && <About />}
        {(!userProfile[1] || userProfile[1]=='posts') &&     <AllDetail />}
        {userProfile[1] == "photos" && <Photos />}
        {userProfile[1] == "friends" && <Friends />
        }
     
    </div>
    </div>
       
        
       



      
      
       
        
        
        
       
        
      
    </>
  );
};
export async function getServerSideProps({ req, res }) {
  await applySession(req, res, cookieInfo);
  const users = req.session.get("user") ? req.session.get("user") : false;
  if (!users) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return { props: { users } };
}
export default Profile;
