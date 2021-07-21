import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../CssModules/allDetailOfUser.module.css';
import CreatePostOtherFormat from '../utils/createPostOtherFormat';
import http from '../utils/http';
import IntroFriendsPhotosSkeleton from '../utils/introFriendsPhotosSkeleton';
import FriendFunctions from '../utils/isFriend';

import LightStoreContext from '../utils/lightStoreContext';
import { confirmRequest, deleteRequest, sendFriendRequest } from '../utils/requestHandlers';
import UserContext from '../utils/userContext';
import OtherUserProfilePosts from './postPages/otherUserProfilePosts';
import UserProfilePosts from './postPages/userProfilePosts';
import Posts from './posts';



const AllDetail = () => {
 


const {activeUserProfile,user,profileUser,relationWithProfileUser,acceptOrDeleteReqs,
    }= 
useContext(UserContext);
const {showSpinner,changeShowSpinner,about,updateAbout,
    myAudience, updateMyAudience,updateAboutProperty,totalFriends,friends}=useContext(LightStoreContext);
const [heightOfThreeBox,changeHeight]=useState(0);
// const [scrollBefore,changeScrollBefore]=useState(0)
const [stickyPosition,changeStickyPosition]=useState(10);
const stopSticky = useRef(false);
const [innderWidth,changeInnerWidth]=useState(window.innerWidth);
const [friendList,changeFriendList]=useState([]);
const introRef=useRef();
const photosRef=useRef();
const friendsRef=useRef();
const [isFriendStatus]= FriendFunctions();
const {userProfile,otherUserProfile} = useRouter().query;
const username=(userProfile&&userProfile[0])||(otherUserProfile&&otherUserProfile[0]);

useEffect(()=>{
    window.addEventListener("resize",watchInnerWidth);
    return()=>{window.removeEventListener('resize',watchInnerWidth)}
},[])

    useEffect(()=>{
 if(about.workAndEdu&&introRef.current){

    let height= introRef.current.clientHeight+
    photosRef.current.clientHeight+friendsRef.current.clientHeight;
    changeHeight(height);
    // console.log(height);

    heightOfThreeBox<490?changeStickyPosition(40):changeStickyPosition(-heightOfThreeBox+friendsRef.current.clientHeight+15)
 }
        
     
    })

    useEffect(async()=>{
        if(activeUserProfile){
            try {
                const {data} = await http.post(`${process.env.NEXT_PUBLIC_API}/getNFriends`,{activeUserProfile})
                // console.log(data);
                changeFriendList(data);
                } catch (error) {
                    console.log(error.message);
                }
        }
    },[activeUserProfile])
//detect down and upscroll
// const onScrollEvent=(e)=>{ 
//         const scrolled = window.scrollY;
//         if(scrollBefore > scrolled){
//          changeScrollBefore(scrolled)
//         }else{
//             changeScrollBefore(scrolled)
//     }
// }

const watchInnerWidth=()=>{
  
  !stopSticky.current&&window.innerWidth<880&&(stopSticky.current=true)
  stopSticky.current&&window.innerWidth>880&&(stopSticky.current=false)

// console.log(stopSticky.current);
}



if(!about.workAndEdu||!user.username){return <IntroFriendsPhotosSkeleton/>}
const {workAndEdu,placeLived,contactAndBasicInfo,familyAndRel,details} = about;
    return ( <>
       
{/* first main box */}
{
activeUserProfile!==user.username&&relationWithProfileUser.notFriend&&
<div className={`${styles.firstBoxOfMainBox}`}>
<div className={`${styles.relationQueryBox} `}>
    <div className={`${styles.addFriendString}`}>
        <span className={styles.doYouKnowString}>
         {"Do you know " + profileUser.fname }?</span>
        <div className={styles.ifKnowString}>To see what
         {profileUser.gender=='male'?'he':' she'} shares with friends, 
    send  {profileUser.gender=='male'?'him':'her '}
         a friend request.</div>
    </div>
    <div className={styles.aroundRequestButton}>
    <div type ='button' className={`${styles.requestButton}`}
    onClick={()=>{changeShowSpinner(true);sendFriendRequest(user,profileUser)}}
    >
        <img className={styles.addFriendIcon} src='http://localhost:3000/img/addFriend.png'></img><span>Add Friend</span>
    </div>
    </div>
</div>
</div>}

{activeUserProfile!==user.username&&relationWithProfileUser.respond&&
    <div className={`${styles.firstBoxOfMainBox}`}>
<div className={`${styles.relationQueryBox} `}>
    <div className={`${styles.respondString}`}>
        <span className={styles.doYouKnowString}>
         {profileUser.fname +" sent you a friend request"}</span>
    </div>
    <div className={` ${styles.aroundConfAndDelete}`}>

    <div type='button' onClick={()=>{changeShowSpinner(true);confirmRequest(user,profileUser);
    acceptOrDeleteReqs(profileUser.username,'friend')}} className={`${styles.reqButtons}
     ${styles.confirmRequest}`}>Confirm Request</div>
  <div type='button' onClick={()=>{changeShowSpinner(true);deleteRequest(user,profileUser);
    acceptOrDeleteReqs(profileUser.username,'removed')}} className={`${styles.reqButtons} 
    ${styles.deleteRequest}`}>Delete Request</div>
    {/* <div type ='button' className={`${styles.requestButton}`}>
        <img className={styles.addFriendIcon} src='http://localhost:3000/img/addFriend.png'></img><span>Add Friend</span>
    </div> */}
    </div>
</div>
</div>}
            {/* second main box */}
        <div className={`${styles.secondBoxOfMainBox}`}>
        <div className={`${styles.infoPhotosFriends} `}>

{/* intro */}
<div 
className={`${stopSticky.current&&styles.stopStickyPosition}`}

style={{position:'-webkit-sticky',
        position:'sticky',
    top:`${stickyPosition}px`}} >
        <div ref={introRef} className={`${styles.commonOfInfoPhotosFriends} 
        ${styles.infoContainer}`}>

            <div className={`${styles.aroundHeadingOfThreeBox}`}>
                <div className={`${styles.headingOfThreeBox}`}>    
                <div  className={`${styles.mainHeadingBox}`}>
                <span>Intro</span>
                 {/* <div><Link href={`${activeUserProfile}/friends`}>
                       See All Friends </Link></div> */}
                        </div>  
                 </div>
            </div>
            <div className={styles.introDetailBoxWithEditButton}>
                {workAndEdu.work.company&&(workAndEdu.work.audience==='public'||
                activeUserProfile===user.username||(workAndEdu.work.audience==='friends'&&isFriendStatus(activeUserProfile)))&&
                <div id={'workBox'}  className={`${styles.aboutPropertyBox}`}>
                    <div className={`${styles.propertyImg}`}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/intro/work.png`}>

                    </img>
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <span> Works at <span className={styles.boldProperty}>{workAndEdu.work.company}</span></span>
                    </div>
                </div>}
               
                {workAndEdu.university.name&&(workAndEdu.university.audience==='public'||
                activeUserProfile===user.username||(workAndEdu.university.audience==='friends'&&isFriendStatus(activeUserProfile)))&&
                <div id={'universityBox'}  className={`${styles.aboutPropertyBox}`}>
                    <div className={`${styles.propertyImg}`}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/intro/university.png`}>

                    </img>
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <span>
                            { workAndEdu.university.graduated?'Studied ':'Studies ' }
                             at <span className={styles.boldProperty}>{workAndEdu.university.name}</span></span>
                    </div>
                </div>}

                {workAndEdu.highSchool.name&&(workAndEdu.highSchool.audience==='public'||
                activeUserProfile===user.username||(workAndEdu.highSchool.audience==='friends'&&isFriendStatus(activeUserProfile)))&&<div id={'highSchoolBox'}  className={`${styles.aboutPropertyBox}`}>
                    <div className={`${styles.propertyImg}`}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/intro/university.png`}>

                    </img>
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <span>
                            { workAndEdu.highSchool.graduated?'Went to ':'Goes to ' }
                              <span className={styles.boldProperty}>{workAndEdu.highSchool.name}</span></span>
                    </div>
                </div>}

                {placeLived.current.currentCityName&&(placeLived.current.audience==='public'||
                activeUserProfile===user.username||(placeLived.current.audience==='friends'&&isFriendStatus(activeUserProfile)))&&<div id={'currentBox'}  className={`${styles.aboutPropertyBox}`}>
                    <div className={`${styles.propertyImg}`}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/intro/current.png`}>

                    </img>
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <span> Lives in <span className={styles.boldProperty}>{placeLived.current.currentCityName}</span></span>
                    </div>
                </div>}


                {placeLived.hometown.homeTownName&&(placeLived.hometown.audience==='public'||activeUserProfile===user.username||(placeLived.hometown.audience==='friends'&&isFriendStatus(activeUserProfile)))&&<div id={'hometownBox'}  className={`${styles.aboutPropertyBox}`}>
                    <div className={`${styles.propertyImg}`}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/intro/hometown.png`}>

                    </img>
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <span>  
                    From <span className={styles.boldProperty}>{placeLived.hometown.homeTownName}</span></span>
                    </div>
                </div>}

                {familyAndRel.relationship.status&&(familyAndRel.relationship.audience==='public'||activeUserProfile===user.username||(familyAndRel.relationship.audience==='friends'&&isFriendStatus(activeUserProfile)))&&<div id={'relationship'}  className={`${styles.aboutPropertyBox}`}>
                    <div className={`${styles.propertyImg}`}>
                    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/intro/status.png`}>

                    </img>
                    </div>
                    <div className={`${styles.propertyString}`}>
                        <span> {familyAndRel.relationship.status}</span>
                    </div>
                </div>}
{activeUserProfile===user.username&&<div type='button ' className={`${styles.introEditAboutDetailButton}`}>
                <Link href={`${activeUserProfile}/about`}>
                    <span type='button' >Edit details</span>
                </Link>
                </div>}



            </div>
            </div>



             {/*photos  */}
        <div ref={photosRef} className={`${styles.commonOfInfoPhotosFriends} 
        ${styles.photosContainer}`}>
            
            <div className={`${styles.aroundHeadingOfThreeBox}`}>
            <div className={`${styles.headingOfThreeBox}`}>    
            <div  className={`${styles.mainHeadingBox}`}>
            <span>Photos</span>
                 <div><Link href={`${activeUserProfile}/photos`}>
                       See All Photos </Link></div>
                        </div>  
                
                 </div>
            </div>
            </div> 

            {/* friends */}
        <div ref={friendsRef} className={`${styles.commonOfInfoPhotosFriends} 
        ${styles.friendsContainer}`}>
            <div className={`${styles.aroundHeadingOfThreeBox}`}>
            <div className={`${styles.headingOfThreeBox}`}>
                <div  className={`${styles.mainHeadingBox}`}>
                <span>Friends</span>
                 <div><Link href={`${activeUserProfile}/friends`}>
                       See All Friends </Link></div>
                        </div>  
                {totalFriends>0&&<div className={`${styles.totalFriendNoBox}`}>
                    <span>{`${totalFriends} friends`}</span>
                    </div>  }
                <div className={`${styles.mainHeadingBox}`}></div>    
                 </div>
            </div>

            <div className={`${styles.introAllFriendsFirstBox}`}>
            <div className={`${styles.introAllFriendsSecondBox}`}>
            <div className={`${styles.introAllFriendsThirdBox}`}>
                {friendList.map((friend)=>
                
                 <div key={friend.username} className={`${styles.actualFriendBox}`}>

                 <div type='button' className={`${styles.friendDp}`}>
                    <Link href={`/profile/${friend.username}`}>
                    <img src={`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${friend.username}`}>
                     </img> 
                        </Link> 
                   
                 </div>
                 <div  className={`${styles.friendName}`}>
                 <Link href={`/profile/${friend.username}`}>
                     <span type='button' >
                        
                         {`${friend.userInfo.fname} ${friend.userInfo.sname}`}
                         </span>
                     </Link>
                 </div>
                 
             </div>)
                   
                }
                
                </div>
                </div>
            </div>
            


            </div> 
            </div>
            </div> 
         <div className={`${styles.allPosts}`}>
         {user.username===activeUserProfile&&<div className={`${styles.postsFilterContainer}`}>
            <CreatePostOtherFormat/>
             </div> }
         <div className={`${styles.postsContainer}`}>
             
        {username===user.username?<UserProfilePosts/>:<OtherUserProfilePosts/>}
       
       
             </div> 
         </div>
         </div>

        
        </> );
}
 
export default AllDetail;