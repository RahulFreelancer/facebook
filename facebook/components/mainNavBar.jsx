import styles from "../CssModules/mainNavBar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../utils/userContext";
import http from "../utils/http";
import {io} from 'socket.io-client';
import CreatePost from "./postsComponent/createPost";
import SelectAudience from "../utils/audienceModel";
import NotificationDropdown from "./mainNavBarComponents/notificationDrop";
import ThirdStoreContext from "../utils/thirdStoreContext";
import SettingDropdown from "./mainNavBarComponents/settingDrop";
import MsgDropdown from "./mainNavBarComponents/msgDrop";
import NewMessage from "../utils/newMessageModel";
import LightStoreContext from "../utils/lightStoreContext";
let friendsNotiSocket;
let notiSocket;

const MainNavBar = () => {
  const [createPostActive, changeCreatePostStatus] = useState(false);
  const [msgActive, changeMsgStatus] = useState(false);
  const [notiActive, changeNotiStatus] = useState(false);
  const [settingActive, changeSettingStatus] = useState(false);
  const [showSearchDropdown,changeShowSearchDropdown] = useState(false);
  const [searchedResult,changeSearchedResult] =useState([]);
  const [searchedItemCount, changeSearchedItemCount] =useState(0);
  const [hideTooltip,changeHideTooltip] =useState(false);
  const [fetching,changeFetching]=useState(true);
  const { user,cropProfilePhoto,profilePhoto,updateProfileUserAndId,
    friendsNotification
  ,updateFriendsNotification,activeUserProfile } = useContext(UserContext);
  const {updateUserFriends,friends,updateFriends}=useContext(LightStoreContext);
  const {updateNewNotiNumber,newNoti,newMsgNoti,updateNewNotiData,updateAllNotiBySocket}=useContext(ThirdStoreContext)
  const router = useRouter();
  const { pathname,query } = router;
  let notiRef = useRef();
  let msgRef=useRef();

  const searchRef=useRef();
  const searchDropdownRef=useRef();
  const moreUserRef=useRef();
  const searchQuery = useRef('');
  useEffect(() => {
   
    // console.log(pathname);
    // console.log(router.query);
   notiActive||msgActive||settingActive||createPostActive?document.addEventListener('click' ,removeNotiEventListener):
   document.removeEventListener('click',removeNotiEventListener)
   
return ()=>{ document.removeEventListener('click',removeNotiEventListener)}
  

  },[notiActive,msgActive,settingActive,createPostActive]);



// useEffect(()=>{
//  console.log(user.username);
//   user.username&&updateNewNotiNumber(user.username);

// },[activeUserProfile])

useEffect(()=>{
user.username&&updateUserFriends(user.username)
},[friends.length])
   useEffect(() => {

    showSearchDropdown?document.addEventListener('click' ,removeShowSearchDropdown):
    document.removeEventListener('click',removeShowSearchDropdown)
    
 return ()=>{ document.removeEventListener('click',removeShowSearchDropdown)}
   
 
   },[showSearchDropdown]);
 

 
   useEffect(()=>{// socket io connection to getProfileRelation express api for realtime
    friendsNotiSocket = io("ws://localhost:3500/expressApi/friendsNotiCount",
 {auth: {token: user._id,
   username:user.username,}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
 });
 
 friendsNotiSocket.on('connect',()=>{
   console.log('friendsNotiSocket '+friendsNotiSocket.connected);
 friendsNotiSocket.emit('updateNoti',{username:user.username})}
 )

 //update the friendsNotificaitoncount in store
 friendsNotiSocket.on('updatedNotiCount',(args)=>{updateFriendsNotification({count:args})})
 friendsNotiSocket.on('connect_error',e=>{
 console.log('error is there in all request ' + e)
 },[user])

friendsNotiSocket.on('updateFriendsNotiCount',(args)=>{
  // console.log(args);
  updateFriendsNotification({count:args});
}) 
 friendsNotiSocket.on('li',(args)=>{console.log(args)})





 return ()=>{
   friendsNotiSocket.disconnect()
 
  }
 
 },[user])

 useEffect(()=>{
  // notiSocket implementation
  
 notiSocket = io("ws://localhost:3500/expressApi/notiSocket",
   {auth: {token: user._id,
     username:user.username,}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
   });
   
  notiSocket.on('connect',()=>{
     console.log('notiSocket '+notiSocket.connected);
    notiSocket.emit('getInitUpdateNoti',{username:user.username}) 
    // notiSocket.emit('getInitUpdate',{username:user.username})
    })
   
notiSocket.on('receiveInitUpdateNoti',(args)=>{
  console.log(args);
  updateAllNotiBySocket(args);
})


  notiSocket.on('receiveNoti',(args)=>{
    console.log(args);
    setTimeout(() => {
      updateNewNotiData(args);
    }, 1000);
    
  })
  
  
  
  
   return ()=>{
    notiSocket.disconnect()
    }
   },[user])







  const removeShowSearchDropdown=(e)=>{
    if(searchRef.current&&searchDropdownRef.current){
    if(!searchRef.current.contains(e.target)&&
    !searchDropdownRef.current.contains(e.target)){
    changeShowSearchDropdown(false);}}
  }
   
   
  
  
  const commonEventListener = ({currentTarget:evnt}) => {
    // e.stopPropagation();
    
    evnt.id==='createPost'&&(createPostActive?changeCreatePostStatus(false):
    changeCreatePostStatus(true)); 

   evnt.id==='notiActive'&&(notiActive?changeNotiStatus(false):
   changeNotiStatus(true));

   evnt.id==='msgActive'&&(msgActive?changeMsgStatus(false):
   changeMsgStatus(true));

   evnt.id==='settingActive'&&(settingActive?changeSettingStatus(false):
   changeSettingStatus(true));
  

  }

 

 const removeNotiEventListener=(e)=>{
   if(notiActive){
     if(notiRef.current){
     if(!notiRef.current.contains(e.target)){
      changeNotiStatus(false);
     }
    }
  }

  if(msgActive){
    if(msgRef.current){
    if(!msgRef.current.contains(e.target)){
    changeMsgStatus(false)
    }
   }
 }

   settingActive&&changeSettingStatus(false);
   createPostActive&&changeCreatePostStatus(false);
  //  console.log('remove');

}


const getMoreUser=async()=>{
  // changeSearchedItemCount(searchedItemCount+10);
  try {
    const {data}= await http.post('http://localhost:3000/api/searchUser',
    {query:searchQuery.current,requestFor:'getMoreUsers',count:searchedItemCount+10})
    changeSearchedResult(data.list);
    if(data.list.length<searchedItemCount+10){
      return changeFetching(false)
    }
    else{changeFetching(true)
    changeSearchedItemCount(searchedItemCount+10)}
  } catch (e) {
    console.log(e.message);
  }
}




const handleSearchBoxQuery=async({currentTarget:input})=>{
  let query =input.value;
  searchQuery.current=query;
 console.log(query);
 if(query===''){changeFetching(true);
  changeSearchedResult([]);
  changeSearchedItemCount(0);
return;}
  query= query.trim();
  query= query.replaceAll(" ","");
 
  
  try {changeSearchedResult([]);
    changeSearchedItemCount(0);
    changeFetching(true);
    const {data} =await http.post('http://localhost:3000/api/searchUser',
    {query,requestFor:'getUsers'})
   changeSearchedResult(data);
   if(data.length<10){changeFetching(false);}
   changeSearchedItemCount(data.length);
  } catch (e) {
    if(e.response&&e.response.status==403){return router.push('/')}
    console.log(e.message);
    
  }
}

//
// changeSettingStatus(false);

  return (
    <>
    <SelectAudience/>
    <CreatePost/>
    <NewMessage/>
    <nav className={`${styles.mainNavBarContainer} d-flex  navbar-light bg-white`}>
    
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#MainBar"
          aria-controls="MainBar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="navbar-toggler-icon"></i>
        </button> */}



      {/* search user box */}
    <div className={`${styles.aroundSearchUser} 
    d-flex justify-content-start align-items-center`} >
      <div ref = {searchDropdownRef} className={` ${styles.searchDropdown}  ${
        !showSearchDropdown&&styles.hideSearchDropdown
      }`}>
        <div className = {styles.whiteBox}></div>
        <div className={`${styles.searchDropHead}
         d-flex justify-content-center align-items-end`}>
<p style={{color:"#8a8d91",fontWeight:"400",fontSize:"1em"}}>Search for users</p>
</div>

<div className={`${styles.searchResult} flex-coloumn `}>
  
  
  {
    searchedResult.map((item)=>(
      
<Link  key ={item._id} prefetch={false}
 href={`/profile/${item.username}`}>
      <div onClick={()=>updateProfileUserAndId(item)} className={`d-flex align-items-center ${styles.userBox}`}>
      <img className={`${styles.profileButtonDp}`} 
     src={`http://localhost:3000/api/getProfilePic?id=${item.username}`} >
                         </img>
                         <h6 className="m-2">{item.fname +" "+ item.sname}</h6>
                         </div>
                         </Link>
    ))
    
   }
              
  </div>
  {(fetching&&searchedItemCount>=10)?<div ref={moreUserRef} className=
  {`d-flex justify-content-center w-100 mb-2 `}>
    <span  className={`${styles.getMoreUserButton}`} onClick={getMoreUser}>
      More</span>
  </div>
  :!fetching&&<div ref={moreUserRef} className={`d-flex justify-content-center w-100 mb-2 `}>
    <span style={{color:"#8a8d91",fontWeight:"500",fontSize:"0.8rem"}} >
      End Of Result</span>
  </div>}

      </div>
        <div className={`
   d-flex align-items-center  ${styles.searchUser}`}
  >
         {showSearchDropdown?<span className={`navbar-brand ${styles.backButton} d-flex justify-content-center align-items-center`}>
          
           <img height="21px"
         width= '21px' src="http://localhost:3000/img/back.svg"/>
         </span>:<a className={`navbar-brand `} href="/"><img height="35px" width= 
              '35px' src="http://localhost:3000/img/fbLogo.svg"/></a>}
              
              
        
       <div className={`${styles.aroundSearchInput} d-flex align-items-center   `}>
       <label className= {`${styles.searchIcon} d-flex justify-content-end align-items-center `} htmlFor='searchInput'>
        <img  height="16px" width= 
              '16px' src="http://localhost:3000/img/search.svg"/>
        </label>
            <input  
            autoComplete='off'  
              className={`form-control  ${styles.searchInput} d-flex align-items-center`}
              type="text"
              id='searchInput'
              placeholder={`Search Facebook`}
              ref={searchRef}
              // onFocus={()=>{changeShowSearchIcon(false)}}
              // onBlur={()=>{changeShowSearchIcon(true)}}
              aria-label="Search"
              onChange={handleSearchBoxQuery}
              onClick={()=>{changeShowSearchDropdown(true);}}
            >
            
            </input>
            </div>
        </div>
        </div>







{/* home and friend box at mid */}
    
          {/* home and friends icon */}
          <div  className={`d-flex justify-content-center ${styles.homeAndfriendLinks}`}>
            {/* home icon */}

           
           <span 
           onClick={()=>{changeHideTooltip(true)}}
           onMouseLeave={()=>changeHideTooltip(false)}
           className={`d-flex align-items-center ${styles.aroundHomeAndFriend} ${pathname === "/home" && styles.bottomBorderActive} `} >
           <span draggable='false'  className={`${styles.tooltip} 
          ${hideTooltip&&styles.hideTooltip} `}>Home</span>
              <Link href="/home">
                <a 
                  className={` 
                  nav-item nav-link ${styles.homeAndFriend}`}
                  id={(pathname !== "/home" && styles.aroundSvgHover) || ""}
                >
                 
                 {pathname === "/home" ?<svg viewBox="0 0 28 28" className={`${styles.svgIconActive}`} height="28" width="28"><path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path>
                 </svg>
                 : <svg  className={` ${styles.svgIcons} `} viewBox="0 0 28 28" height="28" width="28"><path d="M17.5 23.979 21.25 23.979C21.386 23.979 21.5 23.864 21.5 23.729L21.5 13.979C21.5 13.427 21.949 12.979 22.5 12.979L24.33 12.979 14.017 4.046 3.672 12.979 5.5 12.979C6.052 12.979 6.5 13.427 6.5 13.979L6.5 23.729C6.5 23.864 6.615 23.979 6.75 23.979L10.5 23.979 10.5 17.729C10.5 17.04 11.061 16.479 11.75 16.479L16.25 16.479C16.939 16.479 17.5 17.04 17.5 17.729L17.5 23.979ZM21.25 25.479 17 25.479C16.448 25.479 16 25.031 16 24.479L16 18.327C16 18.135 15.844 17.979 15.652 17.979L12.348 17.979C12.156 17.979 12 18.135 12 18.327L12 24.479C12 25.031 11.552 25.479 11 25.479L6.75 25.479C5.784 25.479 5 24.695 5 23.729L5 14.479 3.069 14.479C2.567 14.479 2.079 14.215 1.868 13.759 1.63 13.245 1.757 12.658 2.175 12.29L13.001 2.912C13.248 2.675 13.608 2.527 13.989 2.521 14.392 2.527 14.753 2.675 15.027 2.937L25.821 12.286C25.823 12.288 25.824 12.289 25.825 12.29 26.244 12.658 26.371 13.245 26.133 13.759 25.921 14.215 25.434 14.479 24.931 14.479L23 14.479 23 23.729C23 24.695 22.217 25.479 21.25 25.479Z"></path></svg>
  }

                  </a>
                 
              </Link>
           
              
              </span>
              
              
            {/* friends icon */}
           
            <span  onClick={()=>{changeHideTooltip(true)}}
           onMouseLeave={()=>changeHideTooltip(false)}
             className={`d-flex align-items-center ${styles.aroundHomeAndFriend} ${pathname === "/friends" && styles.bottomBorderActive} `} >
          
            
            <span className={`${styles.tooltip} ${hideTooltip&&styles.hideTooltip} `}>Friends</span>
              <Link href="/friends?removeActiveUser=true" as="/friends">
             
                <a
                  className={`nav-item nav-link 
                  ${styles.homeAndFriend}`}
                  id={(pathname !== "/friends" && styles.aroundSvgHover) || ""}
                > 
          
                  {pathname === "/friends" ? <svg className={`${styles.svgIconActive}`} viewBox="0 0 28 28" height="28" width="28"><path d="M20.34 22.428c.077-.455.16-1.181.16-2.18 0-1.998-.84-3.981-2.12-5.41-.292-.326-.077-.838.36-.838h2.205C24.284 14 27 16.91 27 20.489c0 1.385-1.066 2.51-2.378 2.51h-3.786a.496.496 0 01-.495-.571zM20 13c-1.93 0-3.5-1.794-3.5-4 0-2.467 1.341-4 3.5-4s3.5 1.533 3.5 4c0 2.206-1.57 4-3.5 4zm-9.5-1c-2.206 0-4-2.019-4-4.5 0-2.818 1.495-4.5 4-4.5s4 1.682 4 4.5c0 2.481-1.794 4.5-4 4.5zm2.251 2A6.256 6.256 0 0119 20.249v1.313A2.44 2.44 0 0116.563 24H4.438A2.44 2.44 0 012 21.562v-1.313A6.256 6.256 0 018.249 14h4.502z"></path></svg>
                    :<><svg viewBox="0 0 28 28" className={` ${styles.svgIcons}`} height="28" width="28"><path d="M10.5 4.5c-2.272 0-2.75 1.768-2.75 3.25C7.75 9.542 8.983 11 10.5 11s2.75-1.458 2.75-3.25c0-1.482-.478-3.25-2.75-3.25zm0 8c-2.344 0-4.25-2.131-4.25-4.75C6.25 4.776 7.839 3 10.5 3s4.25 1.776 4.25 4.75c0 2.619-1.906 4.75-4.25 4.75zm9.5-6c-1.41 0-2.125.841-2.125 2.5 0 1.378.953 2.5 2.125 2.5 1.172 0 2.125-1.122 2.125-2.5 0-1.659-.715-2.5-2.125-2.5zm0 6.5c-1.999 0-3.625-1.794-3.625-4 0-2.467 1.389-4 3.625-4 2.236 0 3.625 1.533 3.625 4 0 2.206-1.626 4-3.625 4zm4.622 8a.887.887 0 00.878-.894c0-2.54-2.043-4.606-4.555-4.606h-1.86c-.643 0-1.265.148-1.844.413a6.226 6.226 0 011.76 4.336V21h5.621zm-7.122.562v-1.313a4.755 4.755 0 00-4.749-4.749H8.25A4.755 4.755 0 003.5 20.249v1.313c0 .518.421.938.937.938h12.125c.517 0 .938-.42.938-.938zM20.945 14C24.285 14 27 16.739 27 20.106a2.388 2.388 0 01-2.378 2.394h-5.81a2.44 2.44 0 01-2.25 1.5H4.437A2.44 2.44 0 012 21.562v-1.313A6.256 6.256 0 018.25 14h4.501a6.2 6.2 0 013.218.902A5.932 5.932 0 0119.084 14h1.861z">
                      </path>
                      </svg>
                   </>
                        
                      }
                       
                       {
                        friendsNotification.count!==0&&<span className={` ${styles.aroundFriendsNotiBadge}`}>
            <span className={`${styles.friendsNotiBadge}`}>
              {friendsNotification.count}
              </span></span>}
                </a>
              </Link>
             
              </span>
          
          </div>









{/* last icons tray msg noti setting profile */}


          <div className={`  ${styles.profChatNoti} 
          d-flex justify-content-end align-items-center`}>
             
            <Link href={'/'+user.username} className="nav-item nav-link ">
              <button className={`d-flex align-items-center
                ${styles.profileButton} 
               ${ query.userProfile&&query.userProfile[0]=== user.username&&styles.profileButtonActive}`}>
                 <img className={`${styles.profileButtonDp}`} 
                 src={cropProfilePhoto.cropImg||profilePhoto.img} >
                   </img> 
                   {user.fname}
                   </button>
                
              </Link>
                      
              <div 
              data-toggle="modal" data-target="#createPostModal"
              onClick={()=>{changeHideTooltip(true)}}
           onMouseLeave={()=>changeHideTooltip(false)}
             className={` ${styles.aroundRightSideIcons}`}>
             <span className={`${styles.tooltip} ${hideTooltip&&styles.hideTooltip}`}>Create Post</span>
            <div 
            id='createPost'  onClick={commonEventListener}
            >
              <span className={`${styles.rightSideIcon}
               ${createPostActive&&styles.ButtonActive}`}>
                 <i className={`${styles.createPostIcon}
                  ${ createPostActive&&styles.createPostActive}`} ></i>
              </span>
            </div>
            </div>










           
             <div  onClick={()=>{changeHideTooltip(true)}}
           onMouseLeave={()=>changeHideTooltip(false)}
             className={` ${styles.aroundRightSideIcons}`}>
             <span className={`${styles.tooltip} ${hideTooltip&&styles.hideTooltip}`}>Messenger</span>
            
            <div className={`${styles.aroundMsgButton}`}
             id='msgActive'
             onClick={commonEventListener}
              >
                
        
              <button
              
                className={`btn dropdown-toggle 
                ${styles["dropdown-toggle"]} 
                ${ msgActive && styles.ButtonActive}
                ${styles.rightSideIcon}
                `}
                type="button"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
               
                 <div
                  className={`${styles.msgPosition} ${
                   msgActive && styles.IconActive
                  }
                  `}
                ></div>
                 
              </button>
              <div className={styles.aroundNotiBadge}>
                {newMsgNoti>0&&<span className={styles.aroundNotiBadgeOne}><span>{newMsgNoti>100?'100+':newMsgNoti}</span></span>}
              </div>
              
           
            </div>
            </div>
            {msgActive&&<div ref={msgRef}>
                <MsgDropdown  hideDropDown={changeMsgStatus}/>
                </div>}
           
           <div  onClick={()=>{changeHideTooltip(true)}}
           onMouseLeave={()=>changeHideTooltip(false)}
           className={`${styles.aroundRightSideIcons}`}>
           <span className={`${styles.tooltip} ${hideTooltip&&styles.hideTooltip}`}>Notifications</span>
            <div
               id='notiActive'
              onClick={commonEventListener}
            className={` ${styles.aroundNotiButton} ` }>  
              <button
                 type="button"
                name="notiButton"
                 role="button"
                className={`btn  dropdown-toggle 
                ${styles["dropdown-toggle"]}
                ${ notiActive && styles.ButtonActive} 
               ${styles.rightSideIcon}`}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div
                  className={`${styles.notiPosition} ${
                   notiActive && styles.IconActive
                  }`}
                ></div>
              </button>
              <div className={styles.aroundNotiBadge}>
                {newNoti>0&&<span className={styles.aroundNotiBadgeOne}><span>{newNoti>100?'100+':newNoti}</span></span>}
              </div>
              </div>
            
          
            </div>
            {notiActive&&<div ref={notiRef}><NotificationDropdown hideDropDown={changeNotiStatus} /></div>}



<div  onClick={()=>{changeHideTooltip(true)}}
           onMouseLeave={()=>changeHideTooltip(false)}
className={`${styles.aroundRightSideIcons}`} >
     <span className={`${styles.tooltip} ${hideTooltip&&styles.hideTooltip}`}>Account</span>
            <div className={` ${styles.aroundSettingButton} ` }
               id='settingActive'
               onClick={commonEventListener}>
              <button
                type="button"
                role="button"
                // data-toggle="dropdown"
                className={`btn dropdown-toggle 
                ${styles["dropdown-toggle"]} 
                ${ settingActive && styles.ButtonActive}
                ${styles.rightSideIcon}`}
           
                aria-haspopup="true"
                aria-expanded="false"
              >
                    <div
                  className={`${styles.settingPosition} ${
                   settingActive && styles.IconActive
                  }`}
                ></div>
              </button>
              </div>
             
              
            </div>
            {settingActive&&<div>
            <SettingDropdown/>
              
              </div>}
            </div>
         
        
      </nav>
{/* testing button  */}
      {/* <button className='btn btn-primary' onClick={()=>{
        updateFriendsNotification({count:friendsNotification.count+1})
      }}>increase</button> */}
     
      
    </>
  );
};

export default MainNavBar;
