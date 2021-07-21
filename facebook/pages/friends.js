import { applySession } from "next-iron-session";
import { useContext, useEffect, useState } from "react";
import MainNavBar from "../components/mainNavBar";
import styles from '../CssModules/friends.module.css'
import http from "../utils/http";
import UserContext from "../utils/userContext";
import {io} from 'socket.io-client';
import { confirmRequest,deleteRequest } from "../utils/requestHandlers";
import { Router, useRouter } from "next/router";
import OtherUserProfile from "./profile/[...otherUserProfile]";
import Link from "next/link";
import ChatBox from "../components/chatBox";
import NewNotification from "../utils/newNotiBadge";


let friendRequestsSocket;
const Friends = ({users}) => {


  const [currentTime,changeCurrentTime]=useState(Date.parse(new Date())/1000/60);
const [activeUser,changeActiveUser]=useState("");
const router= useRouter();


  const { user,updateUser,requestReceived,acceptedByOther,updateRequestReceived,
    updateAcceptedByOther,updateIndivAcceptedByOther,updateIndivReceivedReq,acceptOrDeleteReqs
    ,updateActiveReq} = useContext(UserContext);



    useEffect(() => {
              router.query.removeActiveUser&&
              delete router.query.removeActiveUser&&changeActiveUser("");

      let timer = setInterval(()=>changeCurrentTime(Date.parse(new Date())/1000/60), 1000 )
      return ()=> {
          clearInterval(timer)
      }
  
  });






  useEffect(async() => {
    try {
      const obj = await http.post("http://localhost:3000/api/getProfile/profilePhoto",
      {username:users.username})
      const cover = await http.post("http://localhost:3000/api/getProfile/getCoverPhoto",
      {username:users.username})
    
      // const  getArea = await http.get("http://localhost:3000/api/getProfile/getCropArea")
      updateUser(users,{img:obj.data.mainProfilePhoto},{cropImg:obj.data.cropPhoto},cover.data);
      
      
    } catch (error) {
      console.log(error)
    }
    
  }, [user]);

  useEffect(()=>{
    // socket io connection to getProfileRelation express api for realtime
    friendRequestsSocket = io("ws://localhost:3500/expressApi/friendRequests",
 {
 auth: {
   token: user._id,
   username:user.username,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
 }
 });
 
 friendRequestsSocket.on('connect',()=>{
   console.log('friendRequestsSocket '+friendRequestsSocket.connected);
 friendRequestsSocket.emit('getInitialRequests',{username:user.username})}
 )

friendRequestsSocket.on('updateInitialRequests',(args)=>{
  console.log(args);
 updateRequestReceived(args.rec);
 updateAcceptedByOther(args.apdByOther)
})
 
friendRequestsSocket.on("updateFriendReqs",(args)=>{
  console.log(args)
  updateRequestReceived(args.received);
 updateAcceptedByOther(args.accepted);
})

 friendRequestsSocket.on('connect_error',e=>{
 console.log('error is there in all request ' + e)
 },[user])

 
 return ()=>{
   friendRequestsSocket.disconnect()
  }
 
 },[user])





const getTimeSpent=(current,acceptedDate)=>{
  const difference  = Math.floor(current-(Date.parse(acceptedDate)/1000/60));

  if(difference<1){ return 'Just now' }
   if(difference>=60&&difference<1440){
     return Math.floor(difference/60) + ' hrs ago'
   }


   if(difference>=1440){
     return  Math.floor(difference/60/24) + ' days ago'
   }
  
   return difference+' min ago'

}




  


  return (
    <>
    <MainNavBar  />
        <ChatBox/>
        <NewNotification/>
    <div className={`d-flex flex-column align-items-center   ${styles.sideBar}`}>
    <div className={`${styles.heading}`}>
<h4 style={{fontWeight:'bold'}}>Friends</h4>
</div>
<div className={`d-flex flex-column align-items-center ${styles.secondBox}`}>
  
  {/* accepted Requests */}
  {acceptedByOther.length>0&&<div className={`${styles.acceptedRequests}`}>
  <div className={`${styles.friendRequestsHeading}`}>
  <h6>New Friends</h6>
</div>
<div className={`${styles.allAcceptedRequests} d-flex flex-column `}>
  {acceptedByOther.map((friends)=>{
return <>
<Link key={friends.username} href={`/friends?active=${friends.username}&posts=true`}
 as={`/profile/${friends.username}`} id="l" replace>
<div onClick={()=>{updateActiveReq(friends.username);changeActiveUser(friends.username)}}
onMouseEnter={()=>{!friends.seen&&updateIndivAcceptedByOther(friends.username)}}
 key={friends.username} className={`d-flex align-items-center ${friends.active&&activeUser&&styles.activeRequestProfile} 
${!friends.seen&&styles.notSeen} ${styles.recentFriends}`}>
<span>
  <img className={`${styles.requestDp}`} 
  src={`http://localhost:3000/api/getProfilePic?username=${friends.username}`} ></img>
</span>
<div className={ ` ${styles.txtAndSpentTime}`}>
<p className={`${styles.requestText}`}>

 <strong>{friends.fname +' '+friends.sname} </strong>  accepted your friend request
  </p>
  <p className={`${styles.spentTime}`}>  <li>{
    getTimeSpent(currentTime,friends.date)
  } </li></p>
  </div>
</div>
</Link>
</>

  })}


</div>
  </div>}

  {/* Received Requests */}
  <div className={`${styles.friendRequests}`}>
<div className={`${styles.friendRequestsHeading}`}>
  <h6>{requestReceived.length>0&&requestReceived.length} Friend Requests</h6>
</div>
<div className={`${styles.allFriendRequests} d-flex flex-column`}>
{
  requestReceived.map((reqs)=>{
 return   <Link key={reqs.username} href={`/friends?active=${reqs.username}&posts=true`}
 as={`/profile/${reqs.username}`} id="l" replace>
 <div 
 onClick={()=>{updateActiveReq(reqs.username);changeActiveUser(reqs.username)}}
 onMouseEnter={()=>{!reqs.seen&&updateIndivReceivedReq(reqs.username)}}
 className={`d-flex align-items-center ${reqs.active&&activeUser&&styles.activeRequestProfile}
 ${!reqs.seen&&styles.notSeen} ${styles.friendRequest}`}>
<span>
  <img className={`${styles.recReqDp}`} 
  src={`http://localhost:3000/api/getProfilePic?username=${reqs.username}`} ></img>
</span>
<div className={`d-flex flex-column ${styles.txtSpentTimeAndButtons}`}>
{console.log(reqs)}
<div className={`d-flex justify-content-between ${styles.txtAndSpentTimeOfRecReq}`}>
<h6 className='m-0 '>{reqs.fname+' '+reqs.sname}</h6>
<span className={` ${styles.spentTimeOfReqRec}`}> 
{reqs.removed?<span className={`d-flex justify-content-center align-items-center
 ${styles.aroundMoreAction}`}>
  <img className={styles.moreAction} src='http://localhost:3000/img/more.svg'>
    </img>
    </span>:<>
   {getTimeSpent(currentTime,reqs.date)}
     <span className={`${styles.timeDot}`}></span>
     </>}
     </span>
</div>
<div className={`d-flex justify-content-between ${styles.aroundReqButtons}`}>
  {reqs.friends&&<span className={styles.reqAcceptedString}>Request accepted</span>}
  {reqs.removed&&<span className={styles.reqAcceptedString}>Request removed</span>}
  {!reqs.friends&&!reqs.removed&&<><div type='button' onClick={()=>{confirmRequest(user,reqs);acceptOrDeleteReqs(reqs.username,'friend')}} className={`${styles.reqButtons} ${styles.confirmRequest}`}>Confirm</div>
  <div type='button' onClick={()=>{deleteRequest(user,reqs);acceptOrDeleteReqs(reqs.username,'removed')}} className={`${styles.reqButtons} ${styles.deleteRequest}`}>Delete</div></>}
</div>
    </div>
    </div>
    </Link>
  })
}



  {requestReceived.length==0&&<div className={`d-flex justify-content-center ${styles.noFriendRequest}`}>
    <p style={{color:"#8a8d91",fontWeight:"400",fontSize:'0.8em'}}>No new Requests</p>
  </div>}
</div>
  </div>




</div>


</div>
{activeUser?
<div className={styles.aroundOtherUserProfile} >
<OtherUserProfile users={user} activeUser={activeUser}/>
</div>
:<div className={styles.aroundPreviewProfileIcon}>
  <div>
<svg className = {styles.previewProfileIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112">
  <defs>
    <clipPath id="a">
      <circle cx="72.58" cy="53.81" r="12.08" fill="none"/>
    </clipPath>
  </defs>
  <g clip-path="url(#a)">
    <circle cx="72.58" cy="53.81" r="12.08" fill="#1876f2"/>
    <circle cx="62.18" cy="40.55" r="14.72" fill="#a4a7ab"/>
    <circle cx="88.92" cy="39.27" r="14.72" fill="#a4a7ab"/>
  </g>
  <path d="M27.37 17.56h11.3a3.84 3.84 0 013.84 3.84v15h-19v-15a3.84 3.84 0 013.86-3.84z"/>
  <rect width="19" height="24.75" x="23.52" y="26.9" fill="#90c3ff" rx="8.65"/>
  <path fill="#a4a7ab" d="M18.87 55.28h28.3a7 7 0 017 7v37.36H11.92V62.23a7 7 0 016.95-6.95z"/>
  <path fill="#64676b" d="M68.63 68.28h5.06A26.12 26.12 0 0199.8 94.4v5.25H42.51V94.4a26.12 26.12 0 0126.12-26.12z"/>
  <circle cx="66.32" cy="35.2" r="7.55" fill="#a4a7ab"/>
</svg></div>
<span className={styles.stringOfPreviewProfileIcon}>Select people's names to preview their profile.</span>

</div>}
     

    </>
  );
};

export async function getServerSideProps({ req, res }) {
  await applySession(req, res, {
    cookieName: "prince",
    password: process.env.SESS_PASS,
    cookieOptions: {
      httpOnly: true,
      secure: false,
    },
  });
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




export default Friends;
