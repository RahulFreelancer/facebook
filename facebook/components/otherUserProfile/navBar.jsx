import Link from "next/link";
import { useRouter } from "next/router";
import UserContext from "../../utils/userContext";
import { useContext, useEffect, useRef, useState } from "react";
import styles from '../../CssModules/userProfile.module.css';
import http from "../../utils/http";
import {io} from 'socket.io-client';
import  { sendFriendRequest,cancelFriendRequest,confirmRequest,deleteRequest,unfriend } from "../../utils/requestHandlers";
import LightStoreContext from "../../utils/lightStoreContext";
import ThirdStoreContext from "../../utils/thirdStoreContext";
import ReactTooltip from "react-tooltip";


let status;
const Nav = ({activeUser}) => {
  const{addChatBoxes}=useContext(ThirdStoreContext)
  const [showRespondDropdown,changeRespondDropdown]=useState(false);
  const [showFriendsDropdown,changeFriendsDropdown]=useState(false);
  const [stickyNav,changeStickyNav]=useState(false);


  const router = useRouter();

  const { user,profileUser,updateRelationWithProfileUser,
    relationWithProfileUser,acceptOrDeleteReqs,activeUserProfile} 
  = useContext(UserContext);
  const {showSpinner,changeShowSpinner,totalFriends}=useContext(LightStoreContext);
  const {otherUserProfile} = router.query;

  const respondDropdownRef=useRef();
  const aboveNavRef=useRef();
 

useEffect(async()=>{
 
// if(!relationWithProfileUser.notFriend&&!relationWithProfileUser.friends&&
//   !relationWithProfileUser.requested&&!relationWithProfileUser.respond){
 if(activeUserProfile!==user.username){
  try {
    const {data} = await http.post('/api/friendRequestApi/relationStatus',
    {username:user.username,otherUsername:activeUserProfile})
    updateRelationWithProfileUser(data);
  } catch (e) {
    console.log(e.message);
  }
 }

  

},[activeUserProfile])


 
    useEffect(()=>{// socket io connection to getProfileRelation express api for realtime
      status = io("ws://localhost:3500/expressApi/relationStatus",
   {
   auth: {
     token: user._id,
     username:user.username,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
   }
   });
   status.on('updateStatus',(args)=>{
     handleUpdateStatus(args)
    })
   status.on('connect',()=>{console.log('status '+status.connected);
status.emit('getStatus',{username:user.username});
  })
status.on('initialUpdate',(args)=>{
  // console.log(args)
  handleUpdateStatus(args)
})


   status.on('connect_error',e=>{
   console.log('error is there in all request ' + e)
   },[user])
   status.on('li',(args)=>{console.log(args)})
   return ()=>{status.disconnect()}
   
   },[user])
 
 
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
    window.addEventListener('scroll',handleScrollingEvent);
    return ()=>{
      window.removeEventListener('scroll',handleScrollingEvent);
    }
    },[])
      
    const handleScrollingEvent=()=>{
    
    if(aboveNavRef.current){
      const aboveNavRefOffset = aboveNavRef.current.getBoundingClientRect();
      const  top = aboveNavRefOffset.top
      
     top<81&&(changeStickyNav(true))
    top>50&&(changeStickyNav(false))
    }
      
    
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

const handleRequestButtons=()=>{
relationWithProfileUser.notFriend&&(sendFriendRequest(user,profileUser) && changeShowSpinner(true));

relationWithProfileUser.requested&&cancelFriendRequest(user,profileUser)&& changeShowSpinner(true);

relationWithProfileUser.respond&&respondToRequest();
relationWithProfileUser.friends&&friendsDropdown();
}


const friendsDropdown=async()=>{
  showFriendsDropdown?changeFriendsDropdown(false):changeFriendsDropdown(true);
}

const respondToRequest=async()=>{
  showRespondDropdown?changeRespondDropdown(false):changeRespondDropdown(true);

}

// const raiseEvent=()=>{
//   // console.log(status);
//   status.emit('request',{a:"prince",id:'don'})
// }


const handleUpdateStatus=async(obj)=>{
 
  
  const friend = obj.friends.find((reqs)=>{return reqs.username===
    profileUser.username?
    'yes':null;
    });
    const requested=
    obj.requestSent.find((reqs)=>{return reqs.username===profileUser.username?
        'yes':null;
        });
    const respond = obj.requestReceived.find((reqs)=>{return reqs.username===
     profileUser.username?
    'yes':null });
    
    
    
        // res.send({notFriend:'yes'});
       
        
        friend&&updateRelationWithProfileUser({friends:"yes"})
        requested&&updateRelationWithProfileUser({requested:"yes"})
        respond&&updateRelationWithProfileUser({respond:'yes'})
        !requested&&!friend&&!respond&&updateRelationWithProfileUser({notFriend:"yes"})
        changeShowSpinner(false);
      }


      // const isActive=(lastRoute)=>{
      //   if(otherUserProfile){
      //    return otherUserProfile[1]===lastRoute?true:null
      //   }
        
      //   if(userProfile){
      //     return userProfile[1]===lastRoute?true:null
      //   }
      //   }

      const isNavLinkActive=(definedRoute)=>{
        // let fullPath = router.asPath.split('/');
        const lastRoute = router.asPath.split('/').pop();
        const firstStringOfLastRoute=lastRoute.split('_').shift();
      
      return definedRoute===firstStringOfLastRoute?true:null
      }


  return (
    <>
    <div ref={aboveNavRef}></div>
    <div className={styles.mainOfStickySecondNav}>
    <div className={styles.aroundMainSecondNavBarContainer}>
    <div draggable="false" className={`d-flex justify-content-between 
    ${styles.aroundMainSecondNavBar}`}>
      <nav draggable="false" className={`${styles.mainSecondNavBar} navbar 
       navbar-expand-lg navbar-light `}>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon"></span>
        </button>
        <div draggable="false" className="collapse navbar-collapse" id="navbarNav">
          <div draggable="false" className="navbar-nav">
            <Link href={`${activeUser?`/friends?id=${activeUser}&posts=true`:`/profile/${profileUser.username}/posts`}`}
  as={`/profile/${profileUser.username}`} id="l" replace>
              <a 
                className={ `${styles.mainNavItems}
                
                 ${activeUser?((router.query.posts=='true'&&` nav-item nav-link ${styles.navItemActive}`)
                || `nav-item nav-link ${styles.navItems}`)
                   
                :((!otherUserProfile[1] && ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`)}`
                }
              >
                     
Posts                                                       

              </a>
            </Link>





                          
                     


            <Link href={`${activeUser?`/friends?id=${activeUser}&about=true`:`/profile/${profileUser.username}/about`}`}
            id="?about=1" as={`/profile/${profileUser.username}/about`}  replace>
              <a 
                className={`${styles.mainNavItems}
                  ${((isNavLinkActive('about')||router.query.about)  && ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`}`
                }
              >
                About
              </a>
            </Link>
      
            <Link
            href={`${activeUser?`/friends?id=${activeUser}&photos=true`:`/profile/${profileUser.username}/photos`}`}
              as={`/profile/${profileUser.username}/photos`}
              id="?photos=1"
              replace
            >
              <a 
                className={`${styles.mainNavItems}
                  ${((otherUserProfile[1] === "photos"||router.query.photos )&& ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`}`
                }
              >
                Photos
              </a>
            </Link>

            <Link  href={`${activeUser?`/friends?id=${activeUser}&friends=true`:`/profile/${profileUser.username}/friends`}`}
              as={`/profile/${profileUser.username}/friends`}
              id="?friends=1"
              replace
            >
              <a 
                className={` ${styles.friendNavButton} ${styles.mainNavItems}
                  ${((otherUserProfile[1] === "friends"||router.query.friends ) &&
                  ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}`}`
                }
              >
              <span>Friends  {totalFriends>0&&totalFriends}</span> 
              </a>
            </Link>

            <Link  href={`${activeUser?`/friends?id=${activeUser}&videos=true`:`/profile/${profileUser.username}/videos`}`}
              as={`/profile/${profileUser.username}/videos`}
              id="?videos=1"
              replace
            >
              <a 
                className={`${styles.mainNavItems}
                  ${((otherUserProfile[1]=== "videos" || router.query.videos) && 
                  ` nav-item nav-link ${styles.navItemActive}`) ||
                  `nav-item nav-link ${styles.navItems}` }`               }
              >
         Videos
              </a>
            </Link>

          </div>
        </div>
      </nav>
      <div className={`d-flex justify-content-end align-items-center ${styles.secondNavBarActions}`}>
<div>
<div className={`btn ${styles.requestButtonContainer}  ${styles.addFriend}
${relationWithProfileUser.friends&&styles.friendsOverride}`}
onClick={handleRequestButtons}>
{relationWithProfileUser.notFriend&&<span style={{minWidth:"120px"}}
className={`btn d-flex justify-content-center align-items-center
 ${styles.requestButtons} 
 `}>
   {showSpinner?
<div className={`${styles.reqButtonIcons} spinner-border spinner-border-sm `} role="status">
  <span className="sr-only">Loading...</span>
</div>:
<span>
<img className= {`${styles.reqButtonIcons}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/addFriend.svg"></img></span>}
 <span> Add friend</span>
</span>}
{relationWithProfileUser.requested&&<span style={{minWidth:"150px"}}
className={`btn d-flex justify-content-center align-items-center 
${styles.requestButtons} 
`}>
  {showSpinner?
<div className={`${styles.reqButtonIcons} spinner-border spinner-border-sm `} role="status">
  <span className="sr-only">Loading...</span>
</div>:
<span>
<img className= {`${styles.reqButtonIcons}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/cancel.png"></img></span>}

  <span>Cancel Request</span>
</span>
}
{relationWithProfileUser.friends&&<span 
className={`btn d-flex justify-content-center align-items-center 
  ${styles.friendsButton} 
 `}>
   {showSpinner?
<div className={`${styles.reqButtonIcons} spinner-border spinner-border-sm `} 
role="status">
  <span className="sr-only">Loading...</span>
</div>:
  
<span><img className= {`${styles.reqButtonIcons}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/friends.png"></img></span>}
  <span className={`${styles.buttonNames}`}>Friends</span>
</span>
}  
<div  className={`
  ${styles.aroundDropdown}
  ${!showFriendsDropdown&&styles.hideCoverPhotoDrop}`}>
 <div  className={`flex-coloumn 
 align-items-center ${styles.dropdownStyle}`}>

 <button 
 className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/favrt.png"/>
           Favourites
           </button>


              <button onClick={()=>{unfriend(user,profileUser);changeShowSpinner(true)}}
              className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/unfriend.png"/>
              Unfriend</button>
 
 </div>
 </div>

{relationWithProfileUser.respond&&<span
className={`btn d-flex justify-content-center align-items-center 
 ${styles.requestButtons} 
 `}>
    {showSpinner?
<div className={`${styles.reqButtonIcons} spinner-border spinner-border-sm `} 
role="status">
  <span className="sr-only">Loading...</span>
</div>:
<span>
<img className= {`${styles.reqButtonIcons}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/respond.png"></img></span>}
  Respond
</span>}
</div>
<div ref={respondDropdownRef} className={`
  ${styles.aroundDropdown}
  ${!showRespondDropdown&&styles.hideCoverPhotoDrop}`}>
 <div  className={`flex-coloumn 
 align-items-center ${styles.dropdownStyle}`}>

 <button onClick={()=>{
   changeShowSpinner(true);
   confirmRequest(user,profileUser);acceptOrDeleteReqs(profileUser.username,'friend')}}
 className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/accept.svg"/>
           Confirm 
           </button>


              <button onClick={()=>{deleteRequest(user,profileUser); changeShowSpinner(true); acceptOrDeleteReqs(profileUser.username,'removed')}}
              className={`btn d-flex justify-content-start
              align-items-center ${styles.dropButtons}`}>
                  <img className={`${styles.dropButtonIcon}`} 
                  src ="http://localhost:3000/img/delete.svg"/>
              Delete Request</button>
 
 </div>
 </div>
</div>




<ReactTooltip id='profileMsgButton' place="top" effect="solid"></ReactTooltip>
<button data-tip='Send Message' data-for='profileMsgButton' onClick={()=>addChatBoxes(user.username,{username:profileUser.username,userInfo:{fname:profileUser.fname,sname:profileUser.sname}})} className={`btn d-flex justify-content-center align-items-center ${styles.secondRightSideIcons}`}>
  <img className= {`${styles.msgIcon}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/chat.svg"></img>
  </button>
<button className={`btn d-flex justify-content-center align-items-center
 ${styles.secondRightSideIcons}`}>
<img className= {`${styles.searchIcon}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/search.svg"></img>
</button>


<button className={`btn  d-flex justify-content-center align-items-center
 ${styles.secondRightSideIcons}`}>
<img className= {`${styles.moreIcon}`}height="20px" width= 
  '20px' src="http://localhost:3000/img/more.svg"></img>
</button>
</div>

</div>
      </div>
      {/* <button className='btn btn-danger' onClick={raiseEvent}>emit event</button> */}
      </div>
    </>
  );
};

export default Nav;
