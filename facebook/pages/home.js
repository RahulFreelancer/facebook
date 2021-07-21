import http from "../utils/http";
import { applySession } from "next-iron-session";
import { useContext, useEffect } from "react";
import UserContext from "../utils/userContext";
import MainNavBar from "../components/mainNavBar";
import styles from "../CssModules/home.module.css";
import cookieInfo from '../utils/cookie'
import CreatePostOtherFormat from "../utils/createPostOtherFormat";
import NewsFeed from "../components/postPages/newsFeed";
import { useRouter } from "next/router";
import {io} from 'socket.io-client';
import ChatBox from "../components/chatBox";
import NewNotification from "../utils/newNotiBadge";
import ThirdStoreContext from "../utils/thirdStoreContext";
import SinglePost from "../components/postPages/singlePost";
let homeSocket;

const Home = ({ users }) => {
  const { user,updateUser,activeUserProfile,updateActiveUserProfile} = useContext(UserContext);
  const {updateLatestFeedObjectsFromSocket} =useContext(ThirdStoreContext)
    const router=useRouter();

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

  useEffect(()=>{
    // homeSocket implementation
    
   homeSocket = io("ws://localhost:3500/expressApi/homeSocket",
     {auth: {token: user._id,
       username:user.username,}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
     });
     
    homeSocket.on('connect',()=>{
       console.log('homeSocket '+homeSocket.connected);
     
      })
     
  
  
    homeSocket.on('receiveNewsFeed',(args)=>{
      console.log(args);
      setTimeout(() => {
        updateLatestFeedObjectsFromSocket(args.latestFeed)
      }, 1000);
      
    })
    
    
    
    
     return ()=>{
      homeSocket.disconnect()
      }
     },[user])
  
  
  

console.log(router.query);
   
      {/* <button onClick={logout} className="btn btn-primary">
        Logout
      </button> */}
  if (!user) {
    return <h1>Loading......</h1>;
  }

  return (
    <>
        <MainNavBar />
        <ChatBox/>
        <NewNotification/>
        <div className={styles.aroundNewsFeedMain}>
          <div className={styles.newsFeedMain}>
            {!router.query.userPost&&<div className={styles.createPostOtherFormat}>
              <CreatePostOtherFormat/>
            </div>}
            <div className={styles.allFeeds}>
              {router.query.userPost?<SinglePost/>:<NewsFeed/>}
            </div>
          </div>

        </div>
  
   
   
    </>
  );
};

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

export default Home;
