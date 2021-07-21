import { useEffect, useState,useContext } from "react";
import UserContext from "../../utils/userContext"
import { useRouter } from "next/router";
import { applySession } from "next-iron-session";
import http from "../../utils/http";
import MainNavBar from "../../components/mainNavBar";
import Skeleton from "react-loading-skeleton";
import CoverAndDpContainer from "../../components/otherUserProfile/coverAndDpContainer";
import cookieInfo from "../../utils/cookie";
import AllDetail from "../../components/allDetailOfUser";
import styles from '../../CssModules/userProfile.module.css'
import About from "../../components/about";
import Friends from "../../components/friends";
import Photos from "../../components/photos";
import LightStoreContext from "../../utils/lightStoreContext";
import definedRoutes from "../../utils/definedRoutes";
import ChatBox from "../../components/chatBox";
import NewNotification from "../../utils/newNotiBadge";



const OtherUserProfile = ({users,activeUser}) => {


    const { user, updateUser,updateProfileUser,profileUser,activeUserProfile,
        updateProfileUserCoverAndDp, updateActiveUserProfile } = 
    useContext(UserContext);

    const {getAndUpdateTotalFriends,about,updateAbout}=useContext(LightStoreContext);

    const router = useRouter();
    
    activeUser&&(router.query.otherUserProfile=[activeUser]);
  
   
    const { otherUserProfile } = router.query;
   

   
// useEffect(()=>{
//   if(user.username){
//     return user.username===profileUser.username?router.push(`/${user.username}`):true
//   }
 
// },[user.username])
    useEffect( () => {


  if(users.username===otherUserProfile[0]){
    return router.push(`/${user.username}`)
     }
 
     getAndUpdateTotalFriends(otherUserProfile[0]);
        getAboutInfo();
      // console.log(profileUser);
 
            },[otherUserProfile[0]])

useEffect(async()=>{ 
 
  if (!user._id) {
    getUserCredential();
                }   
try {
   await http.post("/api/isPresent", {
        username: otherUserProfile[0],
      });

    if(!activeUser&&otherUserProfile[1]){
   const isValidPath = definedRoutes.find((route)=>route===otherUserProfile[1]);
   !isValidPath&&router.replace("/notFound")}

     
   const user = await http.post ('http://localhost:3000/api/getProfile/getUser',{username:otherUserProfile[0]})
  //  console.log(user);
      const dp = await http.post("http://localhost:3000/api/getProfile/profilePhoto",{username:otherUserProfile[0]});
      const cover = await http.post("http://localhost:3000/api/getProfile/getCoverPhoto",{username:otherUserProfile[0]})
  // console.log(user);
  // console.log(activeUserProfile);
  updateActiveUserProfile(user.data.username);
        updateProfileUser(user.data,{img:dp.data.mainProfilePhoto},
            {cropImg:dp.data.cropPhoto},cover.data);} 
catch (error) {
 router.replace("/notFound");
}

},[otherUserProfile[0]])


// useEffect(async()=>{
   
//     if(profileUserId){
//       if(user.username===profileUser.username){
//         return router.push(`/${user.username}`)}try {
//     const dp = await http.post("http://localhost:3000/api/getProfile/profilePhoto",{username:profileUser.username});
//     const cover = await http.post("http://localhost:3000/api/getProfile/getCoverPhoto",{username:profileUser.username})
//     updateProfileUserCoverAndDp({img:dp.data.mainProfilePhoto},
//         {cropImg:dp.data.cropPhoto},cover.data)
// } catch (e) {
//     console.log(e.message);
// }}},[profileUserId])

    
const getAboutInfo=async()=>{
  try {
    const {data} = await http.post('http://localhost:3000/api/getAboutUser',
    {username:otherUserProfile[0]})
updateAbout(data);
  } catch (e) {
    console.log(e.message);
  }
}

const getUserCredential=async()=>{
    //   console.log(otherUserProfile)
    try {
        const obj = await http.post("http://localhost:3000/api/getProfile/profilePhoto",{username:users.username});
        const cover = await http.post("http://localhost:3000/api/getProfile/getCoverPhoto",{username:users.username})
        
            updateUser(users,{img:obj.data.mainProfilePhoto},
              {cropImg:obj.data.cropPhoto},cover.data);
            
                  } catch (e) {
                     
                    return router.replace("/notFound");
                 }
}
const isNavLinkActive=(definedRoute)=>{
  // let fullPath = router.asPath.split('/');
  const lastRoute = router.asPath.split('/').pop();
  const firstStringOfLastRoute=lastRoute.split('_').shift();

return definedRoute===firstStringOfLastRoute?true:null
}



if(!user.username||!profileUser.username)
{
    return <Skeleton count={10} />;}

    return (<>
<ChatBox/>
<NewNotification/>
   {!activeUser&&<MainNavBar/>}
    <CoverAndDpContainer activeUser={activeUser}/>
    <div className={styles.aroundMainBox}>
    <div className={styles.mainBox}>
    {isNavLinkActive('about') && <About />}
        {(!otherUserProfile[1] || otherUserProfile[1]=='posts') &&     <AllDetail />}
        {otherUserProfile[1] == "photos" && <Photos />}
        {otherUserProfile[1] == "friends" && <Friends />
        }
   
    </div>
    </div>

    
    

    
    
    
    
    
    
    </>  );
}
 
export async function getServerSideProps({ req, res }) {
    await applySession(req, res,cookieInfo);
    const users = req.session.get("user") ? req.session.get("user") : false;
    if (!users) {
      res.setHeader("location", "/");
      res.statusCode = 302;
      res.end();
    }
  
    return { props: { users } };
  }



export default OtherUserProfile;