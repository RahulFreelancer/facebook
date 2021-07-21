
import { React, Component } from "react";
import http from "../utils/http";
import FriendFunctions from "../utils/isFriend";
import LightStoreContext from "../utils/lightStoreContext"
import {likePost,updateLikeTypeOnPost,removelikeFromPost,addComment,
  likeComment, updateLikeOnComment, removeLikeFromComment, addCommentReply,
   likeCommentReply, updateLikeOnCommentReply, removeLikeFromCommentReply, 
   deletePostFromDb, deleteCommentFromDb, deleteCommentReplyFromDb} from '../utils/updateLikeAndComment'
class LightStore extends Component {
 
    handleChangeShowSpinner=(item)=>{
      
          const data  = {...this.state};
          data.showSpinner=item;
         this.setState(data);
        }

        handleUpdateFriends=async(activeUserProfile,username)=>{
      const store = {...this.state}
      try {
        const {data}=await http.post('http://localhost:3000/api/getAllFriends',{
    activeUserProfile,username});
    store.friends=data;
    this.setState(store)
      } catch (error) {
        console.log(error.message);
      }
}
  
handleUpdateUserFriends=async(username)=>{
  const store = {...this.state}
  try {
    const {data}=await http.post('http://localhost:3000/api/getAllUserFriends',{username});
store.userFriends=data;
this.setState(store)
  } catch (error) {
    console.log(error.message);
  }
}




            handleUpdateFriendsToShow=(newFriends)=>{
              const store = {...this.state}
              store.friendsToShow=newFriends;
              this.setState(store);
            }


        handleUpdateTotalFriends=(item)=>{
            const data  = {...this.state};
           data.totalFriends=item;
            this.setState(data);
        }

      

        handleGetAndUpdateRelationWithFriend=async(username,otherUsername)=>{
            console.log('data wala chl rha h ')
            const state = {...this.state};
            try {
                const {data} = await http.post('/api/friendRequestApi/relationStatus',
                {username,otherUsername})
                state.friends.find((friend)=>{
                    friend.username===otherUsername&&(friend.relation=data)})
              } catch (e) {
                console.log(e.message);
              }
          
        };


        handleUpdateRelation=(username,button)=>{
            const data = {...this.state};
           const cloneFriends =[...data.friends];
            cloneFriends.find((friend)=>{
        friend.username===username&&button==='add'&&(friend.relation={requested:'yes'})
        friend.username===username&&button==='cancel'&&(friend.relation={notFriend:'yes'})
        friend.username===username&&button==='confirm'&&(friend.relation={friends:'yes'})
        friend.username===username&&button==='delete'&&(friend.relation={notFriend:'yes'})
            })
            data.friends=cloneFriends;
            this.setState(data)
        }


        handleGetAndUpdateTotalFriends = async(activeUserProfile)=>{

          try {
            const {data}=await http.post('http://localhost:3000/api/getAllFriends?total=yes',{
             activeUserProfile});
              this.handleUpdateTotalFriends(data);
      
          } catch (error) {
            console.log(error.message);
          }
        }




handleUpdateAbout=(item)=>{
  const data = {...this.state};
  data.about=item;
  this.setState(data);
}

handleUpdateAboutProperty=async(username,obj,arg1, arg2)=>{

  const state = {...this.state};
  try {
    const {data} = await http.post(`${process.env.NEXT_PUBLIC_API}/updateAbout`,{
      username,obj,arg1,arg2
    })
    state.about=data;
    this.setState(state)

  } catch (error) {
    console.log(error.message);
  }
}


handleUpdateMyAudience=(item)=>{
const data = {...this.state};
data.myAudience=item;
this.setState(data);
}

handleUpdateUserGender=async(username,obj)=>{
  const state = {...this.state};

  try {
    const {data} = await http.post(`${process.env.NEXT_PUBLIC_API}/updateRefProperty?gender=yes`,{
      username,obj
    })
    // console.log(data);
    state.about=data;
    this.setState(state)

  } catch (error) {
    console.log(error.message);
  }

}

handleDirectUpdateAllPosts=(arr)=>{
  
  const store = {...this.state};
  store.allPosts=arr;
  this.setState(store);

}


handleUpdateMyPosts=async(username,pageName)=>{ 
  const store= {...this.state};
  store.pageName=pageName;
  
  try {
    const {data}=await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/getAllPosts`,
    {username})
    if(data.length===0){console.log('zero post found')
  //   store.pageName=pageName;
  //  setTimeout(() => {
  //   this.setState(store)
  //  }, 200);
  // return;
}
    store.allPosts=data;
    store.allPosts.map((post)=>{post.showComments=true;
      post.pageName=pageName;
      if(post.comments.length>1){
       post.showFromIndex=post.comments.length-1}})
    
       store.allPosts=store.allPosts.filter((post)=>post.postId&&
       (username===post.userInfo.username||post.audience==='public'||this.friendStatus(post.userInfo.username)));
       store.allPosts=store.allPosts.sort(function(a, b){
         return new Date(b.date) - new Date(a.date);})


    setTimeout(() => {
      this.setState(store);
    }, 200);
  
  } catch (error) {
    console.log(error.message);
  }
}



friendStatus=(activeUsername)=>{
  const isPresentFriend= this.state.friends.find((friend)=>friend.username===activeUsername);
  console.log(isPresentFriend);
  return isPresentFriend?true:false;
 }
handleUpdateAllPostsForHome=async(allFeedObj,username)=>{
  const store = {...this.state};
  store.pageName='newsFeed';
  store.allPosts=[];
  if(allFeedObj.length===0){return this.setState(store)}
  try {
    
    allFeedObj.map(async(feed)=>{
      const {data}=await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/getSinglePost`,
      {username:feed.username,postId:feed.postId})
      if(data.fail){
        return store.allPosts.push({blank:'yes'})}
      data.post.showComments=true;
      data.post.pageName='newsFeed';
      if(data.post.comments.length>1){
        data.post.showFromIndex=data.post.comments.length-1}
  store.allPosts.push(data.post);
setTimeout(() => {
  if(store.allPosts.length===allFeedObj.length){
    store.allPosts=store.allPosts.filter((post)=>post.postId&&
    (username===post.userInfo.username||post.audience==='public'||this.friendStatus(post.userInfo.username)));
    store.allPosts=store.allPosts.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);})
   
      this.setState(store);
  
      }
}, 200);

  })
      
  

 
 
 

  
  
  } catch (e) {
    console.log(e.message);
  }
}

// handleUpdateAllPostsToEmpty=()=>{
//   const store = {...this.state};
//   store.allPosts=[];
//   this.setState(store);
//   console.log(store.allPosts);
// }
handleUpdateSinglePost=async(username,postId)=>{
  const store = {...this.state};
  store.allPosts=[];
  store.postsToShow=[];
  try {
    const {data}=await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/getSinglePost`,
    {username,postId})
    data.post.showComments=true;
    data.post.pageName='singlePost';
       if(data.post.comments.length>1){
        data.post.showFromIndex=data.post.comments.length-1}
        store.allPosts.push(data.post);
      
        store.pageName='singlePost';
        setTimeout(() => {
          this.setState(store);
        }, 300);

  } catch (error) {
    console.log(e.message);
  }
}

handleUpdateMyPostsToShow=(posts)=>{
  const store = {...this.state};
  store.postsToShow=posts
  this.setState(store);
}

handleEmptyCurrentShowingPosts=()=>{
  console.log('unsubsicribed from store')
  const store = {...this.state};
  store.allPosts=[];
  store.postsToShow=[];
  this.setState(store);
}


handleIsLikedByMe=(username,postId)=>{
 
const isLiked=this.state.allPosts.find((post)=>{
  if(post.postId===postId){
     return post.likes.find((user)=>{
      return user.username===username;
    })
  }
})

return isLiked?true:false;
}

handleLikeType=(username,postId)=>{
  let like;
  const likeType=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
    return post.likes.find((user)=>{
  return user.username==username&&(like=user)
      })
    }
  })

 
  return like.typeOfLike;
}



handleUpdateLikePost=async(activeUser,postId,typeOfLike)=>{
  const store={...this.state}


const isLiked=this.handleIsLikedByMe(activeUser.username,postId);


if(isLiked){
  const likeType=this.handleLikeType(activeUser.username,postId);
  if(likeType===typeOfLike){
  store.allPosts.find(post=>{
    if(post.postId===postId){
      post.likes=post.likes.filter((user)=>{
 user.username!==activeUser.username
      })
      this.setState(store);
removelikeFromPost(activeUser.username,post.userInfo.username,postId)
    }
  })
}
  else{
    store.allPosts.find((post)=>{
        if(post.postId===postId){
        post.likes.find((user)=>{
          user.username===activeUser.username&&(user.typeOfLike=typeOfLike)
        })
        this.setState(store);
      updateLikeTypeOnPost(activeUser.username,post.userInfo.username,postId,typeOfLike);
    }
    })
     }

}
else{
store.allPosts.find((post)=>{
    if(post.postId===postId){
   post.likes.push({userInfo:{fname:activeUser.fname,sname:activeUser.sname,username:activeUser.username},
typeOfLike,username:activeUser.username})
this.setState(store);
likePost(post.userInfo.username,postId,{userInfo:activeUser._id,
  typeOfLike,username:activeUser.username})
}


})
  }


}

handleLikeTypePresent=(postId,likeType)=>{
  const isTypePresent=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
       return post.likes.find((user)=>{
       return user.typeOfLike===likeType
      })
    }
  })

return isTypePresent?true:false;
}

// handle comment

handleAddComment=(user,postId,string)=>{
  const commentId=new Date()+Math.floor(Math.random() * 1123411213421);
  const commentObj={userInfo:{fname:user.fname,sname:user.sname},
  commentId:commentId,username:user.username,commentString:string, date:new Date(),
  likesOnComment:[],
  replies:[],}
const newComtObj={...commentObj};
newComtObj.userInfo=user._id;

  const store= {...this.state};
  store.allPosts.find((post)=>{
 
    if(post.postId===postId){
      post.totalComments=post.totalComments+1
      post.comments.push(commentObj)
      this.setState(store);
      addComment(post.userInfo.username,postId,newComtObj)
    }
  
  })

 
}

handleUpdateShowReply=(postId,commentId,action)=>{
 
const store = {...this.state}
  if(action==='reply'){
store.allPosts.find((post)=>{if(post.postId===postId){
  return post.comments.find((comment)=>{
    if(comment.commentId===commentId){
     return comment.showReplies=true;
    }
  })
}})
  }

if(action==='showAndHideReplies'){
  store.allPosts.find((post)=>{if(post.postId===postId){
    return post.comments.find((comment)=>{
      if(comment.commentId===commentId){
       comment.showReplies?comment.showReplies=false:comment.showReplies=true;
      }
    })
  }})
}

this.setState(store);

}


handleAddReply=(user,postId,string,commentId,replyTo)=>{
  const newCommentId=new Date()+Math.floor(Math.random() * 1123411213421);
  const commentObj={userInfo:{fname:user.fname,sname:user.sname},
  commentId:newCommentId
  ,username:user.username,commentString:string, date:new Date(),
  likesOnComment:[],
  replyTo,

 }
 
 const newComtObj={...commentObj};
newComtObj.userInfo=user._id;
newComtObj.replyTo=replyTo._id
newComtObj.replyToUsername=replyTo.username;

  const store= {...this.state};
  store.allPosts.find((post)=>{
    if(post.postId===postId){
      post.totalComments=post.totalComments+1
      post.comments.find((comment)=>{
       if(comment.commentId===commentId){
         comment.replies.push(commentObj);
       }
     })
     this.setState(store);
     addCommentReply(post.userInfo.username,postId,commentId,newComtObj)
    }
  })

}

handleUpdateShowComments=(postId,action)=>{

  const store = {...this.state};
  if(action==='show'){
   store.allPosts.find((post)=>{
      if(post.postId===postId){
     
        return post.showComments=true;
      }
    })
  }
  if(action==='showAndHide'){
    store.allPosts.find((post)=>{
      if(post.postId===postId){
       return post.showComments?post.showComments=false:post.showComments=true;
      }
    })
  }
  this.setState(store);
}

handleRemoveShowFromIndex=(postId)=>{
  const store = {...this.state};
  store.allPosts.find((post)=>{
    if(post.postId===postId){
      return post.showFromIndex=false
    }
  })
  this.setState(store);
}

handleUpdateCommentLikes=(activeUser,postId,commentId,typeOfLike)=>{
  const store={...this.state}
const isLiked=this.handleIsCommentLikedByMe(activeUser.username,postId,commentId);
if(isLiked){
  const likeType=this.handleLikeTypeOnComment(activeUser.username,postId,commentId);
  if(likeType===typeOfLike){
 store.allPosts.find(post=>{
    if(post.postId===postId){
 post.comments.find((comment)=>{
  if(comment.commentId===commentId){
   comment.likesOnComment=comment.likesOnComment.filter((likes)=>{
      return likes.username!==activeUser.username
    })
    this.setState(store);
    removeLikeFromComment(post.userInfo.username,activeUser.username,postId,commentId)
  }
})
    }
  })
 
}
  else{
    store.allPosts.find((post)=>{
        if(post.postId===postId){
          post.comments.find((comment)=>{
            if(comment.commentId===commentId){
              comment.likesOnComment.find((likes)=>{
               likes.username===activeUser.username&&(likes.typeOfLike=typeOfLike)
              })
              
            }
          })
          this.setState(store);
          updateLikeOnComment(post.userInfo.username,activeUser.username,postId,commentId,typeOfLike)
    }
    })
    }

}
else{
store.allPosts.find((post)=>{
    if(post.postId===postId){
      post.comments.find((comment)=>{
        if(comment.commentId===commentId){
          comment.likesOnComment.push({userInfo:{fname:activeUser.fname,sname:activeUser.sname,username:activeUser.username}
            ,username:activeUser.username,typeOfLike})
          this.setState(store);
          likeComment(post.userInfo.username,postId,commentId,{userInfo:activeUser._id,username:activeUser.username,typeOfLike})
        }
      })
    }})
    
    }


}



handleIsCommentLikedByMe=(username,postId,commentId)=>{
  const isLiked=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
       return post.comments.find((comment)=>{
       if(comment.commentId===commentId){
         return comment.likesOnComment.find((likes)=>{
           return likes.username===username
         })
       }
      })
    }})
    return isLiked?true:false;
  }
  



handleLikeTypeOnComment=(username,postId,commentId)=>{
  let like;
  const likeType=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
    return post.comments.find((comment)=>{
 if(comment.commentId===commentId){
  return  comment.likesOnComment.find((likes)=>{
    return likes.username==username&&(like=likes)
   })
 }
      })
    }
  })

 
  return like.typeOfLike;

}



handleLikeTypePresentOnComment=(postId,commentId,likeType)=>{
  const isTypePresent=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
     return post.comments.find((comment)=>{
       if(comment.commentId===commentId){
        return comment.likesOnComment.find((likes)=>{
          return likes.typeOfLike===likeType;
         })
       }
     
      })
    
    }
  })
return isTypePresent?true:false;
}


handleUpdateCommentReplyLikes=(activeUser,postId,commentId,replyCommentId,typeOfLike)=>{

  const store={...this.state}
  const isLiked=this.handleIsCommentReplyLikedByMe(activeUser.username,postId,commentId,replyCommentId);
  if(isLiked){

    const likeType=this.handleLikeTypeOnCommentReply(activeUser.username,postId,commentId,replyCommentId);

    if(likeType===typeOfLike){
   store.allPosts.find(post=>{
      if(post.postId===postId){
   post.comments.find((comment)=>{
    if(comment.commentId===commentId){
      comment.replies.find((reply)=>{
        if(reply.commentId===replyCommentId){
          reply.likesOnComment=reply.likesOnComment.filter((likes)=>{
       likes.username!==activeUser.username
          })
        }
      })
  
    }
  })
  this.setState(store);
  removeLikeFromCommentReply(post.userInfo.username,activeUser.username,postId,commentId,replyCommentId)
      }
    })
   
  }
    else{
      store.allPosts.find((post)=>{
          if(post.postId===postId){
            post.comments.find((comment)=>{
              if(comment.commentId===commentId){
                comment.replies.find((reply)=>{
                  if(reply.commentId===replyCommentId){
                    reply.likesOnComment.find((likes)=>{
                      return  likes.username===activeUser.username&&(likes.typeOfLike=typeOfLike)
                    })
                  }
                })
  
              }
            })
            this.setState(store);
            updateLikeOnCommentReply(post.userInfo.username,activeUser.username,postId,commentId,replyCommentId,typeOfLike)
      }
      })
       }
  
  }
  else{
  store.allPosts.find((post)=>{
      if(post.postId===postId){
        post.comments.find((comment)=>{
          if(comment.commentId===commentId){
          comment.replies.find((reply)=>{
            if(reply.commentId===replyCommentId){
              reply.likesOnComment.push({userInfo:{fname:activeUser.fname,sname:activeUser.sname,username:activeUser.username},username:activeUser.username,typeOfLike})
            }
          })
          }
        })
        this.setState(store);
        likeCommentReply(post.userInfo.username,postId,commentId,replyCommentId,{userInfo:activeUser._id,username:activeUser.username,typeOfLike})
      }
       

      })
       
      }
  

}
handleIsCommentReplyLikedByMe=(username,postId,commentId,replyCommentId)=>{
  const isLiked=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
       return post.comments.find((comment)=>{
       if(comment.commentId===commentId){
        return comment.replies.find((reply)=>{
           if(reply.commentId===replyCommentId){
            return reply.likesOnComment.find((likes)=>{
              return likes.username===username
            })
           }
         })
     
       }
      })
    }})
    return isLiked?true:false;
}
handleLikeTypeOnCommentReply=(username,postId,commentId,replyCommentId)=>{
  let like;
  const likeType=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
 post.comments.find((comment)=>{
 if(comment.commentId===commentId){
  comment.replies.find((reply)=>{
     if(reply.commentId===replyCommentId){
        reply.likesOnComment.find((likes)=>{
         return likes.username===username&&(like=likes)
       })
     }
   })
 }
      })
    }
  })
  return like.typeOfLike;

}
handleLikeTypePresentOnCommentReply=(postId,commentId,replyCommentId,likeType)=>{
  const isTypePresent=this.state.allPosts.find((post)=>{
    if(post.postId===postId){
  return  post.comments.find((comment)=>{
       if(comment.commentId===commentId){
return comment.replies.find((reply)=>{
  if(reply.commentId===replyCommentId){
    return reply.likesOnComment.find((likes)=>{
      return likes.typeOfLike===likeType;
    })
  }
})

       }
     
      })
    
    }
  })
return isTypePresent?true:false;



}
handleDeletePost=(username,postId)=>{
  console.log(postId)
  const store = {...this.state};
  store.allPosts=store.allPosts.filter((post)=>{
     return post.postId!==postId
   })
   this.setState(store);
   deletePostFromDb(username,postId);
    
 
  }



handleDeleteComment=(username,postId,commentId)=>{
const store = {...this.state};
store.allPosts.find((post)=>{
  if(post.postId===postId){

 post.comments=post.comments.filter((comment)=>{
   if(comment.commentId===commentId){
    post.totalComments=post.totalComments-(comment.replies.length+1);
   }
   return comment.commentId!==commentId
 })
 this.setState(store);
 deleteCommentFromDb(username,postId,commentId)
  }
})
}

handleDeleteCommentReply=(username,postId,commentId,replyId)=>{
  
  const store = {...this.state};
  store.allPosts.find((post)=>{
    if(post.postId===postId){
      post.totalComments=post.totalComments-1;
post.comments.find((comment)=>{
  if(comment.commentId===commentId){
    comment.replies=comment.replies.filter((reply)=>{
     return reply.commentId!==replyId
    })
  }
})
this.setState(store);
deleteCommentReplyFromDb(username,postId,commentId,replyId)
    }
  })
  }



  state = {
    showSpinner:false,
    changeShowSpinner:this.handleChangeShowSpinner,
    friends:[],
    friendsToShow:[],
    updateFriends:this.handleUpdateFriends,
    updateFriendsToShow:this.handleUpdateFriendsToShow,
    totalFriends:0,
    updateTotalFriends:this.handleUpdateTotalFriends,
    getAndUpdateRelationWithFriend:this.handleGetAndUpdateRelationWithFriend,
    updateRelation:this.handleUpdateRelation,
    getAndUpdateTotalFriends:this.handleGetAndUpdateTotalFriends,

about:{},
updateAbout:this.handleUpdateAbout,
updateAboutProperty:this.handleUpdateAboutProperty,
myAudience:'public',
updateMyAudience:this.handleUpdateMyAudience,
updateUserGender:this.handleUpdateUserGender,
allPosts:[],
postsToShow:[],
updateMyPosts:this.handleUpdateMyPosts,
updateAllPostsForHome:this.handleUpdateAllPostsForHome,
updateMyPostsToShow:this.handleUpdateMyPostsToShow,
isLikedByMe:this.handleIsLikedByMe,
likeType:this.handleLikeType,
updateLikePost:this.handleUpdateLikePost,
likeTypePresent:this.handleLikeTypePresent,
addComment:this.handleAddComment,
updateShowReply:this.handleUpdateShowReply,
addReply:this.handleAddReply,
updateShowComments:this.handleUpdateShowComments,
removeShowFromIndex:this.handleRemoveShowFromIndex,
updateCommentLikes:this.handleUpdateCommentLikes,
isCommentLikedByMe:this.handleIsCommentLikedByMe,
likeTypeOnComment:this.handleLikeTypeOnComment,
likeTypePresentOnComment:this.handleLikeTypePresentOnComment,
updateCommentReplyLikes:this.handleUpdateCommentReplyLikes,
isCommentReplyLikedByMe:this.handleIsCommentReplyLikedByMe,
likeTypeOnCommentReply:this.handleLikeTypeOnCommentReply,
likeTypePresentOnCommentReply:this.handleLikeTypePresentOnCommentReply,
deletePost:this.handleDeletePost,
deleteComment:this.handleDeleteComment,
deleteCommentReply:this.handleDeleteCommentReply,
// updateAllPostsToEmpty:this.handleUpdateAllPostsToEmpty
updateSinglePost:this.handleUpdateSinglePost,
userFriends:[],
updateUserFriends:this.handleUpdateUserFriends,
directUpdateAllPosts:this.handleDirectUpdateAllPosts,
pageName:'',
  };
  render() {
    return (
      <LightStoreContext.Provider value={this.state}>
        {this.props.children}
      </LightStoreContext.Provider>
    );
  }
}

export default LightStore
