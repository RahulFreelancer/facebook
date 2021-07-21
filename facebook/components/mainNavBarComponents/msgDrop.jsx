import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../../CssModules/mainNavBarComponents.module.css'
import http from '../../utils/http';
import LightStoreContext from '../../utils/lightStoreContext';
import ThirdStoreContext from '../../utils/thirdStoreContext';
import UseInfiniteScroll from '../../utils/useInfiniteScroll';
import UserContext from '../../utils/userContext';


const MsgDropdown = ({hideDropDown}) => {

    const {user,activeUserProfile}=useContext(UserContext);
    const {updateSinglePost} = useContext(LightStoreContext)
    const {allChat,chatToShow,updateAllChat,updateChatToShow,addChatBoxes}=useContext(ThirdStoreContext)
  const {userProfile,otherUserProfile} = useRouter().query;
  const router = useRouter();
  const [currentTime,changeCurrentTime]=useState(Date.parse(new Date())/1000/60);
  const fetchedChat=useRef(10);
  const [isFetching,setIsFetching,scrollRef]=UseInfiniteScroll(updateCurrentShowingChat)
  
 
  useEffect(()=>{
    updateCurrentShowingChat();
  },[allChat.length])

  function updateCurrentShowingChat(){

    const newChat= allChat.slice(0,fetchedChat.current);
    updateChatToShow(newChat);

    
    
    if(fetchedChat.current>allChat.length){
      setIsFetching(false),scrollRef.current=true;
    return}
    else{fetchedChat.current=fetchedChat.current+10
      setIsFetching(false)
    }
      }







 
  useEffect(() => {let timeout=setTimeout(()=>changeCurrentTime(Date.parse(new Date())/1000/60), 59000 )
return()=>{clearTimeout(timeout)}

  },[currentTime]);
const getTimeSpent=(current,acceptedDate,action)=>{
 
   
   
 
  const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const difference  = Math.floor(current-(Date.parse(acceptedDate)/1000/60));

  if(difference<1){ return 'Just now' }
   if(difference>=60&&difference<1440){
     return Math.floor(difference/60) + ' h'
   }


   if(difference>=1440){ if(action==='withoutDays'){
  const date =  new Date(acceptedDate).getDate();
  const month= months[new Date(acceptedDate).getMonth()]
  const year =new Date(acceptedDate).getFullYear();
  const time =new Date(acceptedDate).toLocaleTimeString();
  return `${date+' '+month+' '+year} at ${time}`}
  else{
    return  Math.floor(difference/60/24) + ' d'
  }
   }
   return difference+' min'

  

}
const getCaptionFormat=(caption)=>{
    // console.log(caption);
    let arayLength=caption.length;
    const splitCaption = caption[arayLength-1].msg.split(' ');
    const modifiedCaption = `"${(splitCaption[0]&&splitCaption[0])||''} ${(splitCaption[1]&&splitCaption[1])||''}
    ${(splitCaption[2]&&splitCaption[2])||''}"`
    return modifiedCaption;
}
if(!user.username){return<>loading...</>}

    return (   
        <div
          className={` ${styles.dropdownBox}`}  >
          <div className={`${styles.dropdownBoxOne}`}>
          <div className={`${styles.dropdownBoxTwo}`}>
          <div className={`${styles.dropdownBoxThree}`}>
     
      {/* heading */}
          <div className={`${styles.dropdownBoxHeading}`}>
            <div className={`${styles.dropdownBoxHeadingOne}`}>
            <div className={`${styles.dropdownBoxHeadingTwo}`}>
              <div className={`${styles.mainHeading}`}>
                <span>Messenger</span>
              </div>
              


<div className={`${styles.editNotiButton}`}>
     <div className={`${styles.editNotiButtonOne}`}>
        <i className={styles.editNotiIcon}></i>
         </div>
          </div>
         
          <div className={`${styles.editNotiButton}`}>
         
     <div   onClick={()=>hideDropDown(false)} 
      data-toggle="modal" data-target="#friendListModal" className={`${styles.editNotiButtonOne}`}>
        <i className={styles.newMessageIcon}></i>
         </div>
          </div>
             
               </div>
            </div>
</div>          

{/* all chat boxes */}

<div className={`${styles.allNotiContainer}`}>
{allChat.length===0&&
<div className={styles.emptyData}>
<div className={styles.emptyDataString}>
    <span>No chats to show</span></div>
   
    <div  data-toggle="modal"
     data-target="#friendListModal"  className={styles.emptyDataActionButton}
      onClick={()=>hideDropDown(false)}>
        <span>New message</span>
    </div>
    </div>}
{chatToShow.map((chat)=>
<div key={chat.username}>

<div  
onClick={()=>{addChatBoxes(user.username,chat);
    hideDropDown(false); 
}} 
   className={`${styles.notiBox}`}>
<div className={`${styles.notiBoxOne}`}>
<div className={`${styles.notiBoxTwo}`}>
{/* dp */}
<div className={`${styles.notiBoxDp}`}>
<div className={`${styles.notiBoxDpOne}`}>
<svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
style={{height: 56, width: 56}}>
<mask id="avtarMaskMsg">
<circle  cx="28" cy="28" r='28'
fill="white"
></circle>
{/* <circle cx="48" cy="48" data-visualcompletion="ignore" 
fill="black" r="9"></circle> */}
</mask>
<g mask="url(#avtarMaskMsg)">
<image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
width="100%"
 xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${chat.username}`}
 style={{height: 56, width: 56}}>
  </image><circle className={styles.notiAvtarCircle}  cx="28" cy="28" r="28">
    </circle>
    </g>
    </svg>

</div>

</div>
<div className={`${styles.notiBoxString}`}>
<div className={`${styles.actionByUser}`}>
<div className={`${styles.actionByUserOne}`}>
<div className={`${styles.actionByUserString} `}>
{/* chat.read!==true&&styles.notReadColor */}
<span className={!chat.seen&&styles.notSeenColorUsername||''}>{chat.userInfo.fname+' '+chat.userInfo.sname}</span>
</div>
<div className={`${styles.actionByUserDate}`}>
   
<span><span className={!chat.seen&&styles.notSeenColor||''}>{getCaptionFormat(chat.chat)}</span> {getTimeSpent(currentTime,chat.chat[chat.chat.length-1].date.dateObj,'withDay')} </span>
</div>

</div>

</div>


<div className={styles.notSeenDot}>
{!chat.seen&&
<div className={styles.notSeenDotOne}>
   
<div className={styles.notSeenDotTwo}>
<span></span>
</div>
</div>}
</div>
</div>

</div>

</div>

</div>

<div className={`${styles.aroundEditNoti} dropdown`}>
<div  className={` ${styles.editSingleNoti}`} 
data-toggle="dropdown" aria-haspopup="true" 
aria-expanded="false">
<div className={`${styles.editNotiButton}`}>
     <div className={`${styles.editNotiButtonOne}`}>
        <i className={`${styles.editNotiIcon}`}></i>
         </div>
         </div></div>
          {/* <div className={`dropdown-menu ${styles['dropdown-menu']}`}>
            <div className={`${styles.dropMenu}`}>
         
         {!notiObj.read?<div onClick={()=>updateReadNoti(user.username,notiObj.notiId)} className={`${styles.dropMenuButton}`}>
            <div className={styles.aroundActionIcon}> 
           <i className={styles.readUnreadNoti}></i>
             </div>
             <div className={styles.aroundActionString}>
              <span>Mark as read</span></div>
            </div>
            :<div onClick={()=>updateUnReadNoti(user.username,notiObj.notiId)} className={`${styles.dropMenuButton}`}>
             <div className={styles.aroundActionIcon}> 
           <i className={styles.readUnreadNoti}></i>
             </div>
             <div className={styles.aroundActionString}>
              <span>Mark as unread</span></div>
            </div>}

            <div onClick={()=>updateDeleteNoti(user.username,notiObj.notiId)} className={`${styles.dropMenuButton}`}>
             <div className={styles.aroundActionIcon}> 
           <i className={styles.removeNoti}></i>
             </div>
             <div className={styles.aroundActionString}>
              <span>Remove this notification</span></div>
            </div>
          </div>
          </div> */}
          </div>

</div>)}


</div>

</div>          
</div>
           
          </div>
        </div>
         );
}
 
export default MsgDropdown;