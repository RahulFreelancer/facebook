import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../CssModules/mainNavBarComponents.module.css'
import LightStoreContext from './lightStoreContext';
import ThirdStoreContext from './thirdStoreContext';
import UserContext from './userContext';




const NewNotification = () => {

    const {user}=useContext(UserContext);
    const {updateSinglePost} = useContext(LightStoreContext)
    const {allNoti,
      updateDeleteNoti,updateReadNoti,
      updateReadAllNoti,updateUnReadNoti,updateUnReadAllNoti,showNotiBadge,updateShowNotiBadge}=useContext(ThirdStoreContext)

  const router = useRouter();
  const [currentTime,changeCurrentTime]=useState(Date.parse(new Date())/1000/60);

  

const notiObj=allNoti[allNoti.length-1];




useEffect(()=>{
    let timeOut;
  if(showNotiBadge){timeOut=setTimeout(() => {
   updateShowNotiBadge(false)
  }, 5000);}
  return()=>{timeOut&&clearTimeout(timeOut)}
},[showNotiBadge])







 
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
    const splitCaption = caption.split(' ');
    const modifiedCaption = `"${(splitCaption[0]&&splitCaption[0])||''} ${(splitCaption[1]&&splitCaption[1])||''}
    ${(splitCaption[2]&&splitCaption[2])||''}"`
    return modifiedCaption;
}
if(!user.username){return<>loading...</>}
if(!notiObj||!notiObj.userInfo){return<>loading...</>}

    return (  <div>
        <div 
          className={`${showNotiBadge&&styles.showNoti} 
          ${styles.mainNotiBadge}`}  >
          <div className={`${styles.dropdownBoxOne}`}>
          <div className={`${styles.dropdownBoxTwo}`}>
          <div className={`${styles.dropdownBoxThree}`}>
     
      {/* heading */}
          <div className={` ${styles.dropdownBoxHeadingBadge}`}>
            <div className={`${styles.dropdownBoxHeadingOne}`}>
            <div className={`${styles.dropdownBoxHeadingTwo}`}>
              <div className={` ${styles.mainHeadingBadge}`}>
                <span>New notification</span>
              </div>
              
<div className={`${styles.aroundEditNoti}`}>
<div className={`${styles.editNotiButton}`}>
     <div className={`${styles.editNotiButtonOne}`}>
        <i></i>
         </div>
         </div>
         
        
            
             </div>
         </div>
               
            </div>
</div>          

{/* all notification boxes */}
<div className={`${styles.allNotiContainer}`}>


<div key={notiObj.notiId}>

<div  onClick={()=>{
  updateReadNoti(user.username,notiObj.notiId);
  updateSinglePost(notiObj.postUsername,notiObj.postId);
  router.push('/home?userPost=getSingle')}} 
   className={`${styles.notiBox}`}>
<div className={`${styles.notiBoxOne}`}>
<div className={`${styles.notiBoxTwo}`}>
{/* dp */}
<div className={`${styles.notiBoxDp}`}>
<div className={`${styles.notiBoxDpOne}`}>
<svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
style={{height: 56, width: 56}}>
<mask id="avtarMaskNoti">
<circle  cx="28" cy="28" r='28'
fill="white"
></circle>
<circle cx="48" cy="48" data-visualcompletion="ignore" 
fill="black" r="9"></circle>
</mask>
<g mask="url(#avtarMaskNoti)">
<image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
width="100%"
 xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${notiObj.userInfo.username}`}
 style={{height: 56, width: 56}}>
  </image><circle className={styles.notiAvtarCircle}  cx="28" cy="28" r="28">
    </circle>
    </g>
    </svg>
<div className={styles.dpActionEmoji}>
<div className={styles.dpActionEmojiOne}>
  {notiObj.reactionEmoji==='comment'?<i className={styles.commentIcon}></i>:
  <img width='28' height='28' src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/${notiObj.reactionEmoji}.svg`}>
    </img>
}
</div>
</div>
</div>

</div>
<div className={`${styles.notiBoxString}`}>
<div className={`${styles.actionByUser}`}>
<div className={`${styles.actionByUserOne}`}>
<div className={`${styles.actionByUserString} ${notiObj.read!==true&&styles.notReadColor}`}>
<span><strong>{notiObj.userInfo.fname+' '+notiObj.userInfo.sname}</strong> {notiObj.action} {getCaptionFormat(notiObj.captionOrCommentString)}</span>
</div>
<div className={`${styles.actionByUserDate} ${notiObj.read!==true&&styles.notReadColor}`}>
<span>{getTimeSpent(currentTime,notiObj.date,'withDay')}</span>
</div>

</div>

</div>


<div className={styles.notSeenDot}>
{!notiObj.read&&
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

{/* <div className={`${styles.aroundEditNoti} dropdown`}>
<div  className={` ${styles.editSingleNoti}`} 
data-toggle="dropdown" aria-haspopup="true" 
aria-expanded="false">
<div className={`${styles.editNotiButton}`}>
     <div className={`${styles.editNotiButtonOne}`}>
        <i className={styles.editNotiIcon}></i>
         </div>
         </div></div>
          <div className={`dropdown-menu ${styles['dropdown-menu']}`}>
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
          </div>
          </div> */}

</div>


</div>

</div>          
</div>
           
          </div>
        </div>
        </div> 
         );
}
 
export default NewNotification;