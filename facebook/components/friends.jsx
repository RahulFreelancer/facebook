import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
// import dbConnect from '../../expressBackend/utils/dbConnect';
import styles from '../CssModules/allFriendsOfUser.module.css';
import http from '../utils/http';
import LightStoreContext from '../utils/lightStoreContext';
import { cancelFriendRequest,sendFriendRequest,deleteRequest,confirmRequest,unfriend} from '../utils/requestHandlers';
import UseInfiniteScroll from '../utils/useInfiniteScroll';
import UserContext from '../utils/userContext';
import FriendSkeleton from './friendSkeleton';

const Friends = () => {
  const [showRespondDropdown,changeRespondDropdown]=useState(false);
  const [showFriendsDropdown,changeFriendsDropdown]=useState(false);
const fetchedFriends =useRef(6);
const {friends,updateFriends,totalFriends
,getAndUpdateRelationWithFriend,updateRelation,
getAndUpdateTotalFriends,updateFriendsToShow,friendsToShow}=useContext(LightStoreContext)
const {activeUserProfile,user}=useContext(UserContext);
const respondDropRef=useRef();
const router = useRouter();
const {userProfile,otherUserProfile}=router.query;
const [isFetching,setIsFetching,scrollRef] = UseInfiniteScroll(fetchFriends);




useEffect(()=>{showRespondDropdown&&document.addEventListener('click',
removeRespondDropdownListener);
return()=>{
    document.removeEventListener('click',removeRespondDropdownListener)
}
},[showRespondDropdown])

useEffect(()=>{showFriendsDropdown&&document.addEventListener('click',
removeFriendsDropdownListener);
return()=>{
    document.removeEventListener('click',removeFriendsDropdownListener)
}
},[showFriendsDropdown])

useEffect(()=>{
  document.documentElement.scrollTop=400;

  const username=(userProfile&&userProfile[0])||(otherUserProfile&&otherUserProfile[0]);
  getAndUpdateTotalFriends(username);
  user.username&&updateFriends(username,user.username);
},[router.query,user])


useEffect(()=>{
setIsFetching(true);
},[friends])




async function fetchFriends(){

  const newFriends= friends.slice(0,fetchedFriends.current);
  updateFriendsToShow(newFriends);
  // console.log(fetchedFriends.current)
  
  if(fetchedFriends.current>friends.length){
    
    setIsFetching(false),scrollRef.current=true;
  return}
  else{fetchedFriends.current=fetchedFriends.current+6
    setIsFetching(false)
  }
 
}


const friendsDropdown=async()=>{
  showFriendsDropdown?changeFriendsDropdown(false):changeFriendsDropdown(true);
}

const respondToRequest=async()=>{
  showRespondDropdown?changeRespondDropdown(false):changeRespondDropdown(true);

}

const removeFriendsDropdownListener=(e)=>{
  // if(!respondDropdownRef.current.contains(e.target)){
  //   changeRespondDropdown(false);}
    changeFriendsDropdown(false)
}
 const removeRespondDropdownListener=(e)=>{
  // if(!respondDropdownRef.current.contains(e.target)){
  //   changeRespondDropdown(false);}
    changeRespondDropdown(false)
}

  return <>

<div className={`${styles.allFriends}`}>
  <div className={`${styles.friendsHeading}`}>
    <Link href={`/${activeUserProfile}/friends`}>
    <a>
    Friends
              </a>

    </Link>
  </div>
  <div className={`${styles.friendsNav}  `}>
   
   <Link href={`${activeUserProfile===user.username?
  `/${activeUserProfile}/friends`:
`/profile/${activeUserProfile}/friends`}`}
><a
     className={`${styles.friendsNavItems}
                  ${
                    (((userProfile&&userProfile[1]=== "friends")||
                    (otherUserProfile&&otherUserProfile[1]==='friends') )&&
                `  ${styles.friendsNavItemActive}`) ||
                  `${styles.friendsNavItemsHover}` }`               }
              >
          All Friends
              </a></Link>
  </div>
  <div className={`${styles.friendsList}`}>
  {friends.length>0&&friendsToShow.map((friend)=>{

 
  return <div key={friend.username} className={`${styles.friendBox}`}>
 {/* {console.log(friend)} */}
<span><img  className = {`${styles.friendProfilePhoto}`}
 src = {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${friend.username}`}></img>
 </span>
<Link href={`/profile/${friend.username}`}>
  <a className={`${styles.friendNameLink} }` }>
  
        {friend.userInfo.fname+' '+ friend.userInfo.sname}
              </a>
            </Link>
            <div className={styles.aroundRequestButtons}>

    {friend.relation.notFriend&&<div type ='button' 
    className={`${styles.requestButtons}
   ${styles.friendAddFriendButton}`}
    onClick={()=>{  updateRelation(friend.username,'add'); sendFriendRequest(user,friend)}}
    >
<span>Add Friend</span>
    </div>}
    {friend.relation.requested&&<div type ='button' 
    className={`${styles.requestButtons}
   ${styles.friendCancelRequestButton}`}
    onClick={()=>{updateRelation(friend.username,'cancel');cancelFriendRequest(user,friend)}}
    >
<span>Cancel Request</span>
    </div>}
    {friend.relation.respond&&<div type ='button' 
    className={`${styles.requestButtons}
   ${styles.friendRespondButton}`}
    onClick={respondToRequest}
    >
<span>Respond</span>
    </div>}
    <div ref={respondDropRef} className={`
  ${styles.aroundDropdown}
  ${!showRespondDropdown&&styles.hideDropDown}`}>
 <div  className={`flex-coloumn 
 align-items-center ${styles.dropdownStyle}`}>

 <button onClick={()=>{
updateRelation(friend.username,'friends');
   confirmRequest(user,friend);acceptOrDeleteReqs(friend.username,'confirm')}}
 className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/accept.svg"/>
           Confirm 
           </button>


              <button onClick={()=>{updateRelation(friend.username,'delete');deleteRequest(user,friend);  acceptOrDeleteReqs(friend.username,'removed')}}
              className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/delete.svg"/>
              Delete Request</button>
 
 </div>
 </div>

    {friend.relation.friends&&<div type ='button' 
    className={`${styles.requestButtons}
   ${styles.friendsButton}`}
    onClick={friendsDropdown}
    >
<span>Friends</span>
    </div>}
    <div  className={`
  ${styles.aroundDropdown}
  ${!showFriendsDropdown&&styles.hideDropDown}`}>
 <div  className={`flex-coloumn 
 align-items-center ${styles.dropdownStyle}`}>

 <button 
 className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/favrt.png"/>
           Favourites
           </button>

        
              <button onClick={()=>{updateRelation(friend.username,'delete');unfriend(user,friend)}}
              className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/unfriend.png"/>
              Unfriend</button>
 
 </div>
 </div>
    </div>

  </div>

  }

  )}
    
  </div>
  {isFetching&&<FriendSkeleton  keyArray={[498,599,699,121]}/>}



</div>
  
  
  
  
  
  
  
  
  
  
  </>;
};

export default Friends;
