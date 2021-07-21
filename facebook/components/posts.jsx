import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../CssModules/posts.module.css';
import UserContext from '../utils/userContext';
import ContentEditable from 'react-contenteditable';
import CommentBox from './postsComponent/commentBox';
import LightStoreContext from '../utils/lightStoreContext';
import UseInfiniteScroll from '../utils/useInfiniteScroll';
import ReactToolTip from 'react-tooltip'
import Link from 'next/link';
import { useRouter } from 'next/router';
import PostSkeleton from '../utils/postSkeleton';
import FriendFunctions from '../utils/isFriend';


const Posts = ({pageNameProp}) => {

  const {allPosts,
    postsToShow,
    updateMyPosts,
    updateMyPostsToShow,
    isLikedByMe,
  likeType,
  updateLikePost,
likeTypePresent,
updateShowReply,
updateShowComments,
removeShowFromIndex,
updateCommentLikes,
isCommentLikedByMe,
likeTypeOnComment,
likeTypePresentOnComment,
updateCommentReplyLikes,
isCommentReplyLikedByMe,
likeTypeOnCommentReply,
likeTypePresentOnCommentReply,
deletePost,
deleteComment,
deleteCommentReply,
directUpdateAllPosts,
pageName}=useContext(LightStoreContext)
console.log(allPosts,postsToShow);
  const {user,activeUserProfile}=useContext(UserContext);
  const [disableEmojiBoxHoverClass,changeDisableHoverClass]=useState(false);
  const [currentTime,changeCurrentTime]=useState(Date.parse(new Date())/1000/60);

  const fetchedPosts=useRef(5);
const replyTo = useRef({});
  const commentBoxRef=useRef({});
  const [isFetching,setIsFetching,scrollRef]=UseInfiniteScroll(updateCurrentShowingPosts)
  const [isFriendStatus] = FriendFunctions();
  const {userProfile,otherUserProfile} = useRouter().query;
  const username=(userProfile&&userProfile[0])||(otherUserProfile&&otherUserProfile[0]);
 
  useEffect(()=>{
  if(pageNameProp===pageName){
console.log(allPosts);
    scrollRef.current=false;
    setTimeout(() => {
      setIsFetching(true);
    }, 800);
}
},[user,allPosts])


 
useEffect(()=>{
  return()=>{
    
    // directUpdateAllPosts([]);
    updateMyPostsToShow([]);
 
    }
},[])

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



function updateCurrentShowingPosts(){

console.log(fetchedPosts.current)
console.log(allPosts.length)
console.log(isFetching);

const newPosts= allPosts.slice(0,fetchedPosts.current);
updateMyPostsToShow(newPosts);


if(fetchedPosts.current>allPosts.length){
  setIsFetching(false)
  scrollRef.current=true;
return}
else{
  fetchedPosts.current=fetchedPosts.current+3
  setIsFetching(false)
}
  }


  const  bringCommentBoxIntoView=(postId)=>{
    if(commentBoxRef.current[postId]){
   
    commentBoxRef.current[postId].scrollIntoView({ 
      behavior: "smooth", 
      block: "nearest"
   });
  //  console.log(commentBoxRef.current[postId])
  commentBoxRef.current[postId].focus();
  
  }

  else{
    setTimeout(() => {
      commentBoxRef.current[postId].scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest"
     });
    //  console.log(commentBoxRef.current[postId])
    commentBoxRef.current[postId].focus();
    
    }, 200);
  }
  }


//  if(pageNameProp==='home'&&postsToShow[0]&&postsToShow[0].pageName!=='home'){
//   return <PostSkeleton postProp={[91,102,320]}/>
//  }

  // const username=(userProfile&&userProfile[0])||(otherUserProfile&&otherUserProfile[0]);
  //  if(user.username!==username&&postsToShow[0]&&postsToShow[0].pageName!=='otherProfile'){
  //    return  <PostSkeleton postProp={[91,102,320]}/>
  //  }
   if(postsToShow[0]&&postsToShow[0].pageName!==pageNameProp){
     console.log(postsToShow[0].pageName)
    return  <PostSkeleton postProp={[91,102,320]}/>
   }
  // console.log(pageNameProp);
  // console.log(pageName);


 if(pageNameProp!==pageName){console.log(pageNameProp,pageName)
   return  <PostSkeleton postProp={[91,102,320]}/>}
   if(!username&&user.username!==activeUserProfile){
    return  <PostSkeleton postProp={[91,102,320]}/>}

  return <div>{allPosts.length===0&&!isFetching&&<div className={styles.noPostToShow}>
  <span>No Posts Available</span></div>}
  {postsToShow.map((post)=>{
    // post.postId&&(myCounter.current=myCounter.current+1)
  return <div key={(post.postId&&post.postId)||Math.random()}  className={styles.aroundPostContainer}>
  {post.postId&&(post.audience==='public'||user.username===post.userInfo.username||(post.audience==='friends'&&isFriendStatus(post.userInfo.username)))&&
<div className ={styles.postContainer}>
 
  {/* post head */}
<div className={styles.aroundPostHead}>
<div className={styles.postHead}>
<div className={styles.postOwnerDp}>
<svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
style={{height: 40, width: 40}}>
  <mask id="avtarMask">
    <circle  cx="20" cy="20" r='20'
    fill="white"
  ></circle>
    </mask>
    <g mask="url(#avtarMask)">
      <image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
      width="100%"
       xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${post.userInfo.username}`}
       style={{height: 40, width: 40}}>
        </image><circle className={styles.userAvtarCircle}  cx="20" cy="20" r="20">
          </circle>
          </g>
          </svg>


  {/* <img src={
    `${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${user.username}`}>
  </img> */}
</div>
{/* postHead Caption of post */}
<div className={styles.postOwnerNameTimeSpentAndAudience}>
  <div className={styles.postOwnerName}>
    <Link href={`/profile/${post.userInfo.username}`}>
    <a className={styles.username}>{`${post.userInfo.fname} ${post.userInfo.sname} `} </a> 
    </Link>
    <span className={styles.actionOfPost}>
      {/* {`${'updated his profile picture'}`} */}
    </span>

  </div>
  <div className={styles.timeSpendAndAudience}>
   <span>{getTimeSpent(currentTime,post.date,'withoutDays')}</span>
   <span>
     <img data-tip={post.audience=='public'&&'Public'||
    post.audience=='friends'&&'Friends'||post.audience=='onlyMe'&&'Only me'} src={`${process.env.NEXT_PUBLIC_HOST}/img/audience/postAudience/${post.audience}.png`}></img>
   </span>
  </div>
</div>
{/* postHead edit Box */}
{post.userInfo.username===user.username&&<div className={`${styles.editButtonAndDropContainer} dropdown`}>
<div type='button'
className={`dropdown-toggle ${styles.editPost}`} 
   data-toggle="dropdown" aria-haspopup="true" 
   aria-expanded="false">
  <img 
  src={`${process.env.NEXT_PUBLIC_HOST}/img/more.svg`}></img>
</div>
<div className={`dropdown-menu ${styles.dropMenu}`}>

  <div className={styles.dropMenuButton}>
    <img src={`${process.env.NEXT_PUBLIC_HOST}/img/delete.png`}></img>
<span  onClick={()=>deletePost(post.userInfo.username,post.postId)}>Delete Post</span>

</div>
</div>
</div>}
</div>
{post.caption&&<div className={styles.aroundCaption}>
  <span>{post.caption}</span>
</div>}
</div>



{/*post Photo*/}
{post.media&&Object.keys(post.media).length>0&&<div className={styles.aroundPostPhoto}>
  <div className={styles.postPhoto}>

{/* single photo grid */}
    {Object.keys(post.media).length===1&&<>
    {post.media[1].fileType==='image'?
    <img className={styles.singlePhotoGrid}
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}>
    </img>:<video preload="none" controls className={styles.singlePhotoGrid} src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}></video>
    }
    </>  }

{/* 2 photos grid */}
    { Object.keys(post.media).length===2&&<>
    <div className={` ${styles.doublePostPhoto}`}>
    {post.media[1].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}></video>
    }
</div>
<div className={`${styles.paddingTop} ${styles.doublePostPhoto}`}>
    {post.media[2].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}></video>
    }
</div>
</>
    

  }

{/* trying */}

    










{/* 3 photos grid */}
{ Object.keys(post.media).length===3&&<>
<div className={`${styles.paddingBottom} ${styles.firstBoxOfThreePhoto}`}>
{post.media[1].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}></video>
    }
</div>

<div className={styles.secondBoxOfThreePhoto}>
  <div className={`${styles.bottomTwoOfThreePhoto}`}>
  {post.media[2].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}></video>
    }
</div>
<div className={`${styles.paddingLeft} ${styles.bottomTwoOfThreePhoto}`}>
{post.media[3].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[3].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[3].path}`}></video>
    }
</div>

</div></>

}


{/* 4 photos grid */}
{ Object.keys(post.media).length===4&&<>
<div className={`${styles.paddingBottom} ${styles.firstBoxOfFourPhoto}`}>
{post.media[1].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}></video>
    }
</div>

<div className={styles.secondBoxOfFourPhoto}>
  <div className={`${styles.bottomThreeOfFourPhoto}`}>
  {post.media[2].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}></video>
    }
</div>
<div  className={`${styles.paddingLeft} ${styles.bottomThreeOfFourPhoto}`}>
{post.media[3].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[3].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[3].path}`}></video>
    }
</div>
<div className={`${styles.paddingLeft} ${styles.bottomThreeOfFourPhoto}`}>
{post.media[4].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[4].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[4].path}`}></video>
    }
</div>

</div></>

}


{/* 5 photos grid */}
{ Object.keys(post.media).length===5&&<>
<div className={styles.fivePhotosGridContainer}>

<div className={`${styles.paddingRight} ${styles.firstBoxOfFivePhotosGrid}`}>
<div className={`  ${styles.leftTwoOfFivePhotosGrid}`}>
{post.media[1].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[1].path}`}></video>
    }
</div>
<div  className={`${styles.paddingTop}  ${styles.leftTwoOfFivePhotosGrid}`}>
{post.media[2].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[2].path}`}></video>
    }
</div>
</div>

<div className={` ${styles.secondBoxOfFivePhotosGrid}`}>
  <div className={` ${styles.rightThreeOfFivePhotosGrid}`}>
  {post.media[3].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[3].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[3].path}`}></video>
    }
</div>
<div className={` ${styles.paddingTop} ${styles.rightThreeOfFivePhotosGrid}`}>
{post.media[4].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[4].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[4].path}`}></video>
    }
</div>
<div className={` ${styles.paddingTop} ${styles.rightThreeOfFivePhotosGrid}`}>
{post.media[5].fileType==='image'?
    <img 
     src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[5].path}`}>
    </img>:<video preload="none" controls src={`${process.env.NEXT_PUBLIC_API}/postApi/getPostMedia?path=${post.media[5].path}`}></video>
    }
</div>

</div>
</div>
</>

}



  </div>
</div>}



{/* post Like and commment box */}

<div className={styles.aroundLikeAndComment}>

{/* like and comment count and button box */}
  <div className={styles.aroundWhoLikedAndCommentAndButtons}>
  {(post.likes[0]||post.comments[0])&&<div className={styles.whoLikedAndComment}>
      <div className={styles.totalLikes}>
        <div className={styles.aroundReactionIcons}>
        <div className={styles.reactionIcons}>{
         <>
        {likeTypePresent(post.postId,'Like')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Like.svg`}></img>}
        {likeTypePresent(post.postId,'Love')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Love.svg`}></img>}
        {likeTypePresent(post.postId,'Care')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Care.svg`}></img>}
        {likeTypePresent(post.postId,'Wow')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Wow.svg`}></img>}
        {likeTypePresent(post.postId,'Haha')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Haha.svg`}></img>}
        {likeTypePresent(post.postId,'Sad')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Sad.svg`}></img>}
        {likeTypePresent(post.postId,'Angry')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Angry.svg`}></img>}
        </>}
        </div>
        {post.likes[0]&&<span>{post.likes.length}</span>}
        </div>
        <div className={styles.whoLikedMyPost}>
       
          {post.likes.map((likeObj)=>{
         return <div  key={likeObj.username} className={styles.listOfLikes}>
    <img src = {`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/${likeObj.typeOfLike}.svg`}>
      </img>
            <span >
            {likeObj.userInfo.fname+' '+likeObj.userInfo.sname}
          </span>
          </div>})}
        
        </div>
      </div>

     
      <div className={styles.totalComments}>
       { post.comments[0]&&<span onClick={()=>updateShowComments(post.postId,'showAndHide')}
       >{`${post.totalComments} comments`}</span>}
      </div>
      </div>}
    <div className={styles.aroundLikeAndCommentButtons}>
    <div className={styles.likeAndCommentButtons}>
    <div className={styles.aroundCommonToReactionButtonsContainer }>
            
    <ReactToolTip className={styles.emojiToolTip} effect="solid" place='top'/>

    <div onMouseOver={()=>{disableEmojiBoxHoverClass&&changeDisableHoverClass(false)}} onClick={()=>{updateLikePost(user,post.postId,'Like')}} className=
    {`${styles.likePostButton} ${styles.aroundCommonToReactionButtons}` }>
      <div className={`${styles.commonToReactionButtons} 
      ${styles.likeButton}`}>
        <div className={styles.reactionIconAndText}>
<span>

{isLikedByMe(user.username,post.postId)&&likeType(user.username,post.postId)!='Like'?
        <img className={styles.icon}  
        src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/${likeType(user.username,post.postId)}.svg`}></img>
        :<i data-visualcompletion="css-img" 
className={`${isLikedByMe(user.username,post.postId)?styles.activeLikeButtonIcon:styles.likeButtonIcon}`}></i>
}
        </span>

        </div>
        <div className={styles.reactionIconAndText}>
<span className={isLikedByMe(user.username,post.postId)?
styles[likeType(user.username,post.postId)]:undefined}>
  {!isLikedByMe(user.username,post.postId)?'Like':likeType(user.username,post.postId)}
</span>
        </div>
        </div>
</div>
      <div className={`${styles.likeEmojiContainer}
       ${!disableEmojiBoxHoverClass&&styles.hoverLikeEmojiContainer}`}>
        <div onClick={()=>{updateLikePost(user,post.postId,'Like');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Like'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Like.svg`}></img>
         </div>
         <div onClick={()=>{updateLikePost(user,post.postId,'Love');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Love'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Love.svg`}></img>
         </div>
         <div onClick={()=>{updateLikePost(user,post.postId,'Care');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Care' src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Care.svg`}></img>
         </div>
         <div onClick={()=>{updateLikePost(user,post.postId,'Haha');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Haha'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Haha.svg`}></img>
         </div>
         <div onClick={()=>{updateLikePost(user,post.postId,'Wow');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Wow'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Wow.svg`}></img>
         </div>
         <div onClick={()=>{updateLikePost(user,post.postId,'Sad');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Sad'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Sad.svg`}></img>
         </div>
         <div onClick={()=>{updateLikePost(user,post.postId,'Angry');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Angry'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Angry.svg`}></img>
         </div>
      </div>
 
      </div>
      <div className={styles.aroundCommonToReactionButtonsContainer }>
      <div onClick={()=>{updateShowComments(post.postId,'show');
    bringCommentBoxIntoView(post.postId)}}  className={` ${styles.aroundCommonToReactionButtons}`}>
      <div className={`${styles.commonToReactionButtons} 
      ${styles.commentButton}`}>

         <div className={styles.reactionIconAndText}>
       <span>
<i data-visualcompletion="css-img" 
className={styles.commentButtonIcon}></i>
</span>
        </div>
        <div className={styles.reactionIconAndText}>
<span>Comment</span>
        </div>
      </div>
      </div></div>

      
      <div className={styles.aroundCommonToReactionButtonsContainer }>
        <div className={styles.aroundCommonToReactionButtons}>
      <div className={`${styles.commonToReactionButtons} 
      ${styles.shareButton}`}>
 <div className={styles.reactionIconAndText}>
<span>
<i data-visualcompletion="css-img" 
className={styles.shareButtonIcon}></i>
</span>
        </div>
        <div className={styles.reactionIconAndText}>
<span>Share</span>
        </div>

      </div>
      </div>
      </div>
      </div>
      </div>

  </div>

{/* comments from people */}
  {post.showComments&&<div className={styles.aroundCommentsFromPeople}>
    
    <div className={styles.firstBoxForTopBorder}></div>
   
    {post.comments.length>1&&post.showFromIndex&&<div className={styles.aroundViewMoreComments}>
      <div className={styles.viewMoreComments}>
        <span onClick={()=>removeShowFromIndex(post.postId)}>{`View all ${post.comments.length} comments`}</span>
      </div>
    </div>}

    <ul className={styles.commentList}>
      {post.comments.map((comment)=>
      {  
        if(post.showFromIndex){

        if(post.comments.indexOf(comment)<post.showFromIndex){
          return;
        }
      }
     return <li key={comment.commentId} className={styles.commentListItem}>
        {/* original comment */}
<div>
 
<div className={styles.originalCommentContainer}>
  <div className={styles.commentUserDpBox}>
    <span>
    <svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
style={{height: 32, width:32}}>
  <mask id="avtarMaskComment">
    <circle    cx="16" cy="16"  r="16"
    fill="white"
    ></circle>
    </mask>
    <g mask="url(#avtarMaskComment)">
      <image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
      width="100%"
       xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${comment.username}`}
       style={{height:32, width:32}}>
        </image><circle className={styles.userAvtarCircle}   cx="16" cy="16" r="16">
          </circle>
          </g>
          </svg>

    </span>
  </div>
  <div className={styles.commentStringAndReplyAndLikeButtonBox}>
    {/* commentString */}
<div className={styles.afterMainCommentStringBox}>


<div className={styles.commentStringAndLikeEmojiBox}>
  <div className={styles.commentStringAndUsername}>
    <span className={styles.commentUsername}>{comment.userInfo.fname+' '+comment.userInfo.sname}</span>
    <div className={styles.commentString}>
      <span>{comment.commentString}</span>
    </div>
  </div>
  {
  comment.likesOnComment[0]&&<div className={styles.aroundTotalLikesOnCommentWithEmoji}>
    <div className={styles.totalLikesOnCommentWithEmoji}>
      <div className={styles.emojiOFLikedComment}>
   {<>
        {likeTypePresentOnComment(post.postId,comment.commentId,'Like')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Like.png`}></img>}
        {likeTypePresentOnComment(post.postId,comment.commentId,'Love')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Love.png`}></img>}
        {likeTypePresentOnComment(post.postId,comment.commentId,'Care')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Care.png`}></img>}
        {likeTypePresentOnComment(post.postId,comment.commentId,'Wow')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Wow.png`}></img>}
        {likeTypePresentOnComment(post.postId,comment.commentId,'Haha')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Haha.png`}></img>}
        {likeTypePresentOnComment(post.postId,comment.commentId,'Sad')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Sad.png`}></img>}
        {likeTypePresentOnComment(post.postId,comment.commentId,'Angry')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Angry.png`}></img>}
        </>}
      </div>
      <span>{comment.likesOnComment.length}</span>
    </div>
  </div>}
</div>

{/* more action for this comment */}
{comment.username===user.username&&<div className={`${styles.editButtonAndDropContainer}  ${styles.aroundCommentMoreAction} dropdown`}>
<div type='button'
   data-toggle="dropdown" aria-haspopup="true" 
   aria-expanded="false" className={`dropdown-toggle ${styles.commentMoreAction}`}>
  <div><i data-visualcompletion="css-img" 
className={styles.commentMoreActionIcon}></i></div>
  </div>


<div className={`dropdown-menu ${styles.dropMenu}`}>
  <div className={styles.dropMenuButton}>
    <img src={`${process.env.NEXT_PUBLIC_HOST}/img/delete.png`}></img>
<span  onClick={()=>deleteComment(post.userInfo.username,post.postId,comment.commentId)}>Delete Comment</span>

</div>
</div>

</div>}



</div>

{/* like and replybutton */}
<ul className={styles.aroundCommentButtons}>
<li className={`${styles.commonOfCommentButtons}`}>
<span style={{display:'none'}} className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>

  <span onMouseOver={()=>{disableEmojiBoxHoverClass&&changeDisableHoverClass(false)}} onClick={()=>updateCommentLikes(user,post.postId,comment.commentId,'Like')} className={`${styles.likePostButton} ${isCommentLikedByMe(user.username,post.postId,comment.commentId)?
styles[likeTypeOnComment(user.username,post.postId,comment.commentId)]:undefined}`}>
  {!isCommentLikedByMe(user.username,post.postId,comment.commentId)?'Like':likeTypeOnComment(user.username,post.postId,comment.commentId)}
    </span>
 
    <div className={`${styles.commentLikeEmojiContainer} ${styles.likeEmojiContainer}
       ${!disableEmojiBoxHoverClass&&styles.hoverLikeEmojiContainer}`}>
        <div onClick={()=>{updateCommentLikes(user,post.postId,comment.commentId,'Like');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Like'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Like.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentLikes(user,post.postId,comment.commentId,'Love');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Love'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Love.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentLikes(user,post.postId,comment.commentId,'Care');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Care' src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Care.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentLikes(user,post.postId,comment.commentId,'Haha');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Haha'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Haha.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentLikes(user,post.postId,comment.commentId,'Wow');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Wow'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Wow.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentLikes(user,post.postId,comment.commentId,'Sad');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Sad'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Sad.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentLikes(user,post.postId,comment.commentId,'Angry');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Angry'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Angry.svg`}></img>
         </div>
      </div>















</div>
</li>

<li className={`${styles.commonOfCommentButtons}`}>
<span className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>
  <span onClick={()=>{replyTo.current=comment.userInfo; updateShowReply(post.postId,comment.commentId,'reply');bringCommentBoxIntoView(comment.commentId)}}>Reply</span>
</div>
</li>
<li className={`${styles.commonOfCommentButtons}`}>
<span className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>
  <span>See translation</span>
</div>
</li>
<li className={`${styles.commonOfCommentButtons}`}>
<span className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>
  <span>{getTimeSpent(currentTime,comment.date,'withDays')}</span>
</div>
</li>
</ul></div>
</div>
</div>



{/* all replies on comment  */}
{
<div>
<div className={styles.viewReplyButtonContainer}>

  {comment.replies[0]&&<div className={styles.aroundViewReplyButton}>
    <span className={styles.aroundViewReplyButtonIcon}>
    <i data-visualcompletion="css-img" 
className={styles.viewReplyButtonIcon}></i>
    </span>
    <span onClick={()=>updateShowReply(post.postId,comment.commentId,'showAndHideReplies')} className={styles.viewReplyButtonString}>
     {`${comment.showReplies?'Hide':'View'} ${comment.replies.length} replies`}
    </span>
  </div>}

     

  {comment.showReplies&&<ul className={styles.commentList}>
      {comment.replies.map((replies)=>
      <li key={replies.commentId} className={styles.commentListItem}>
   
   
        {/* original comment */}
<div>
<div className={styles.originalCommentContainer}>
  <div className={styles.commentUserDpBox}>
    <span>
    <svg aria-hidden="true"  data-visualcompletion="ignore-dynamic" role="none" 
style={{height: 32, width:32}}>
  <mask id="avtarMaskComment">
    <circle    cx="16" cy="16"  r="16"
    fill="white"
    ></circle>
    </mask>
    <g mask="url(#avtarMaskComment)">
      <image x="0" y="0" height="100%" preserveAspectRatio="xMidYMid slice" 
      width="100%"
       xlinkHref= {`${process.env.NEXT_PUBLIC_API}/getProfilePic?username=${replies.username}`}
       style={{height:32, width:32}}>
        </image><circle className={styles.userAvtarCircle}   cx="16" cy="16" r="16">
          </circle>
          </g>
          </svg>

    </span>
  </div>
  <div className={styles.commentStringAndReplyAndLikeButtonBox}>
    {/* commentString */}
<div className={styles.afterMainCommentStringBox}>


<div className={styles.commentStringAndLikeEmojiBox}>
  <div className={styles.commentStringAndUsername}>
    <span className={styles.commentUsername}>{replies.userInfo.fname+' '+replies.userInfo.sname}</span>
    <div className={styles.commentString}>
      <span><strong>{replies.replyTo.fname+' '+replies.replyTo.sname+' '}</strong> {replies.commentString}</span>
    </div>
  </div>
  {replies.likesOnComment[0]&&<div className={styles.aroundTotalLikesOnCommentWithEmoji}>
    <div className={styles.totalLikesOnCommentWithEmoji}>
      <div className={styles.emojiOFLikedComment}>
      {<>
        {likeTypePresentOnCommentReply(post.postId,comment.commentId,replies.commentId,'Like')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Like.png`}></img>}
        {likeTypePresentOnCommentReply(post.postId,comment.commentId,replies.commentId,'Love')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Love.png`}></img>}
        {likeTypePresentOnCommentReply(post.postId,comment.commentId,replies.commentId,'Care')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Care.png`}></img>}
        {likeTypePresentOnCommentReply(post.postId,comment.commentId,replies.commentId,'Wow')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Wow.png`}></img>}
        {likeTypePresentOnCommentReply(post.postId,comment.commentId,replies.commentId,'Haha')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Haha.png`}></img>}
        {likeTypePresentOnCommentReply(post.postId,comment.commentId,replies.commentId,'Sad')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Sad.png`}></img>}
        {likeTypePresentOnCommentReply(post.postId,comment.commentId,replies.commentId,'Angry')&&<img id={styles.icon}  src={`${process.env.NEXT_PUBLIC_HOST}/img/dpReaction/Angry.png`}></img>}
        </>}
      </div>
      <span>{replies.likesOnComment.length}</span>
    </div>
  </div>}
</div>

{/* more action for this comment */}

{replies.username===user.username&&<div className={`${styles.editButtonAndDropContainer}  ${styles.aroundCommentMoreAction} dropdown`}>
<div type='button'
   data-toggle="dropdown" aria-haspopup="true" 
   aria-expanded="false" className={`dropdown-toggle ${styles.commentMoreAction}`}>
  <div><i data-visualcompletion="css-img" 
className={styles.commentMoreActionIcon}></i></div>
  </div>


<div className={`dropdown-menu ${styles.dropMenu}`}>
  <div className={styles.dropMenuButton}>
    <img src={`${process.env.NEXT_PUBLIC_HOST}/img/delete.png`}></img>
<span  onClick={()=>deleteCommentReply(post.userInfo.username,post.postId,comment.commentId,replies.commentId)}>Delete Comment</span>

</div>
</div>

</div>}



</div>

{/* like and replybutton */}
<ul className={styles.aroundCommentButtons}>
<li className={`${styles.commonOfCommentButtons}`}>
<span style={{display:'none'}} className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>
<span onMouseOver={()=>{disableEmojiBoxHoverClass&&changeDisableHoverClass(false)}} 
onClick={()=>updateCommentReplyLikes(user,post.postId,comment.commentId,
  replies.commentId,'Like')} 
className={`${styles.likePostButton} ${isCommentReplyLikedByMe(user.username,post.postId,comment.commentId,replies.commentId)?
styles[likeTypeOnCommentReply(user.username,post.postId,comment.commentId,replies.commentId)]:undefined}`}>
  {!isCommentReplyLikedByMe(user.username,post.postId,comment.commentId,replies.commentId)?'Like':
  likeTypeOnCommentReply(user.username,post.postId,comment.commentId,replies.commentId)}
    </span>
 
    <div className={`${styles.commentLikeEmojiContainer} ${styles.likeEmojiContainer}
       ${!disableEmojiBoxHoverClass&&styles.hoverLikeEmojiContainer}`}>
        <div onClick={()=>{updateCommentReplyLikes(user,post.postId,comment.commentId,replies.commentId,'Like');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Like'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Like.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentReplyLikes(user,post.postId,comment.commentId,
  replies.commentId,'Love');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Love'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Love.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentReplyLikes(user,post.postId,comment.commentId,
  replies.commentId,'Care');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Care' src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Care.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentReplyLikes(user,post.postId,comment.commentId,
  replies.commentId,'Haha');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Haha'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Haha.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentReplyLikes(user,post.postId,comment.commentId,
  replies.commentId,'Wow');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Wow'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Wow.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentReplyLikes(user,post.postId,comment.commentId,
  replies.commentId,'Sad');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Sad'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Sad.svg`}></img>
         </div>
         <div onClick={()=>{updateCommentReplyLikes(user,post.postId,comment.commentId,
  replies.commentId,'Angry');changeDisableHoverClass(true)}}
         className={`${styles.likeEmoji}`}>
           <img data-tip='Angry'  src={`${process.env.NEXT_PUBLIC_HOST}/img/reactionSvg/Angry.svg`}></img>
         </div>
      </div>
</div>
</li>

<li className={`${styles.commonOfCommentButtons}`}>
<span className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>
  <span onClick={()=>{replyTo.current=replies.userInfo;bringCommentBoxIntoView(comment.commentId)}}>Reply</span>
</div>
</li>
<li className={`${styles.commonOfCommentButtons}`}>
<span className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>
  <span>See translation</span>
</div>
</li>
<li className={`${styles.commonOfCommentButtons}`}>
<span className={styles.betweenButtonDot} aria-hidden="true">&nbsp;·&nbsp;</span>
<div className={styles.commentButtons}>
  <span>{getTimeSpent(currentTime,replies.date,'withDays')}</span>
</div>
</li>

</ul>

</div>
</div>
</div>

      </li>)}
      <CommentBox replyTo={replyTo} defaultReplyTo={comment.userInfo} boxRef={commentBoxRef} boxId={comment.commentId} commentId={comment.commentId} action={'reply'} postId={post.postId} placeholder='Write a Reply...'/>
    </ul>}











</div>

</div>}
      </li>})}
    </ul>
    <CommentBox boxRef={commentBoxRef} boxId={post.postId}  action={'comment'} postId={post.postId} placeholder='Write a comment...'/>
    </div>}
</div>

</div>}
  </div>})}
  {isFetching&&<PostSkeleton postProp={[91,102,320]}/>}
  </div>
};

export default Posts;



