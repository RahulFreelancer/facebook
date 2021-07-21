import { compareSync } from "bcrypt";
import { applySession } from "next-iron-session";
import Notification from "../../../dbModel/apiNotification";
import Posts from "../../../dbModel/apiPosts";
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";
 


database.connect();


async function likePost(req,res){
const {username,postId,likeObj}=req.body;

try {
 const action=likeObj.typeOfLike==='Like'?'likes your post':'reacted to your post';
let notiObj={};

    const user = await Posts.findOne({username});
   user.posts.find((post)=>{
        if(post.postId===postId){
            notiObj={userInfo:likeObj.userInfo,notiId:postId,
                action,captionOrCommentString:post.caption,
                reactionEmoji:likeObj.typeOfLike,postId,postUsername:username,
                read:false,date:new Date()}
       return post.likes.push(likeObj)
        }})
    const newUser= new Posts(user)
await newUser.save();
if(username!==likeObj.username){
    const noti = await Notification.findOne({username});
    noti.newNoti=noti.newNoti+1;
    noti.notifications.push(notiObj)
    await new Notification(noti).save()
    }
    return res.send('liked by user');
} catch (error) {
    return res.status(501).send('error reported ')
}


}
async function updateLikeTypeOnPost(req,res){
    const {likedByUsername,username,postId,typeOfLike}=req.body;
    try {
        if(username!==likedByUsername){
            const action=typeOfLike=='Like'?'likes your post':'reacted to your post';
const noti = await Notification.findOne({username});
noti.notifications.find((notiObj)=>{if(notiObj.notiId===postId){
notiObj.reactionEmoji=typeOfLike;
notiObj.action=action;
notiObj.date=new Date();
}})
await new Notification(noti).save()
}


        const user = await Posts.findOne({username});
       user.posts.find((post)=>{
            if(post.postId===postId){
  
                post.likes.find((user)=>{
                   return user.username===likedByUsername&&(user.typeOfLike=typeOfLike)
                  })
            }})
        const newUser= new Posts(user)
    await newUser.save();
        return res.send('likeUpdated');
    } catch (error) {
        return res.status(501).send('error reported ')
    }

}
async function removeLikeFromPost(req,res){
    const {likedByUsername,username,postId}=req.body;




    try {
        if(username!==likedByUsername){
            const noti = await Notification.findOne({username});
            noti.newNoti=noti.newNoti-1;
          noti.notifications=noti.notifications.filter(notiObj=>notiObj.notiId!==postId)
          await new Notification(noti).save()
            }



        const user = await Posts.findOne({username});
       user.posts.find((post)=>{
            if(post.postId===postId){
                post.likes=post.likes.filter((user)=>{
                    return user.username!==likedByUsername
                         })
            }})
        const newUser= new Posts(user)
    await newUser.save();
        return res.send('likedRemoved');
    } catch (error) {
        return res.status(501).send('error reported ')
    }
}


async function addComment(req,res){
    const {username,postId,commentObj}=req.body;
    try {
        const action='Commented on your post'
        let notiObj={};
        const user = await Posts.findOne({username});
       user.posts.find((post)=>{
            if(post.postId===postId){
                notiObj={userInfo:commentObj.userInfo,notiId:commentObj.commentId,
                    action,captionOrCommentString:post.caption,
                    reactionEmoji:'comment',postId,postUsername:username,
                    read:false,date:new Date()}
                post.totalComments=post.totalComments+1
                post.comments.push(commentObj)
            }})
        const newUser= new Posts(user)
    await newUser.save();
    if(username!==commentObj.username){
        const noti = await Notification.findOne({username});
        noti.newNoti=noti.newNoti+1;
        noti.notifications.push(notiObj)
        await new Notification(noti).save()
        }
        return res.send('commentAdded');
    } catch (error) {
        return res.status(501).send('error reported ')
    }
    
    
    }

    async function likeComment(req,res){
        const {username,postId,commentId,commentObj}=req.body;
        try {
            let commentUsername=''
            let action='';
            let notiObj={};
           
            const user = await Posts.findOne({username});
           user.posts.find((post)=>{
                if(post.postId===postId){
                    post.comments.find((comment)=>{
                        if(comment.commentId===commentId){
commentUsername=comment.username;
                            const sameUser=(username===commentObj.username&&'their post')||(username===comment.username&&'your post')||(username!==comment.username&&username!==commentObj.username&&`someone's post`);
                           action= commentObj.typeOfLike==='Like'?`likes your comment on ${sameUser}`:`reacted to your comment on ${sameUser}`;
                         notiObj={userInfo:commentObj.userInfo,notiId:postId+commentId,
                            action,captionOrCommentString:comment.commentString,
                            reactionEmoji:commentObj.typeOfLike,postId,postUsername:username,
                            read:false,date:new Date()}
                         
                           return  comment.likesOnComment.push(commentObj)
                        }
                      })
                }})
            const newUser= new Posts(user)
        await newUser.save();
 
        if(commentObj.username!==commentUsername){
            const noti = await Notification.findOne({username:commentUsername});
            noti.newNoti=noti.newNoti+1;
            noti.notifications.push(notiObj)
            await new Notification(noti).save()
            }
            return res.send('comment liked by user');
        } catch (error) {
            return res.status(501).send('error reported ')
        }
        
        
        }
    
    async function updateLikeOnComment(req,res){
        const {username,likedByUsername,postId,commentId,typeOfLike}=req.body;
        try {
          let action=''

let commentUsername='';

            const user = await Posts.findOne({username});
           user.posts.find((post)=>{
                if(post.postId===postId){
                    post.comments.find((comment)=>{
                        if(comment.commentId===commentId){
                            commentUsername=comment.username;
                            const sameUser=(username===likedByUsername&&'their post')||(username===comment.username&&'your post')||(username!==comment.username&&username!==likedByUsername&&`someone's post`);
                            action= typeOfLike==='Like'?`likes your comment on ${sameUser}`:`reacted to your comment on ${sameUser}`;

                          comment.likesOnComment.find((likes)=>{
                           return likes.username===likedByUsername&&(likes.typeOfLike=typeOfLike)
                          })
                          
                        }
                      })
                }})
            const newUser= new Posts(user)
        await newUser.save();
        if(commentUsername!==likedByUsername){
const noti = await Notification.findOne({username:commentUsername});
noti.notifications.find((notiObj)=>{if(notiObj.notiId===postId+commentId){
notiObj.reactionEmoji=typeOfLike;
notiObj.action=action;
notiObj.date=new Date();
}})
await new Notification(noti).save()
}
            return res.send('comment like updated');
        } catch (error) {
            return res.status(501).send('error reported ')
        }
        
        
        }
    
    async function removeLikeFromComment(req,res){
        const {username,likedByUsername,postId,commentId}=req.body;
        try {

           let commentUsername=''

            const user = await Posts.findOne({username});
           user.posts.find((post)=>{
                if(post.postId===postId){
                    post.comments.find((comment)=>{
                        if(comment.commentId===commentId){
                            commentUsername=comment.username;
                         comment.likesOnComment=comment.likesOnComment.filter((likes)=>{
                            return likes.username!==likedByUsername
                          })
                        }
                      })
                }})
            const newUser= new Posts(user)
        await newUser.save();
        if(commentUsername!==likedByUsername){
            const noti = await Notification.findOne({username:commentUsername});
            noti.newNoti=noti.newNoti-1;
          noti.notifications=noti.notifications.filter(notiObj=>notiObj.notiId!==postId+commentId)
          await new Notification(noti).save()
            }
            return res.send('comment like Removed');
        } catch (error) {
            return res.status(501).send('error reported ')
        }
        
        
        }
    
// replies functionality

async function addCommentReply(req,res){
    const {username,postId,commentId,commentObj}=req.body;
    try {
        let commentUsername=commentObj.replyToUsername;
        let action='';
        let notiObj={};
        const user = await Posts.findOne({username})
       user.posts.find((post)=>{
            if(post.postId===postId){
                post.totalComments=post.totalComments+1
                post.comments.find((comment)=>{
                 if(comment.commentId===commentId){
                    const sameUser=(username===commentObj.username&&'their post')||(username===commentUsername&&'your post')||(username!==commentUsername&&username!==commentObj.username&&`someone's post`);
                    action= `Mentioned you on ${sameUser} `;
                  notiObj={userInfo:commentObj.userInfo,notiId:commentObj.commentId,
                     action,captionOrCommentString:comment.commentString,
                     reactionEmoji:'comment',postId,postUsername:username,
                     read:false,date:new Date()}
                 return  comment.replies.push(commentObj);
                 }
               })
            }})
        const newUser= new Posts(user)
    await newUser.save();
     
    if(commentObj.username!==commentUsername){
        const noti = await Notification.findOne({username:commentUsername});
        noti.newNoti=noti.newNoti+1;
        noti.notifications.push(notiObj)
        await new Notification(noti).save()
        }
        return res.send('commentReplyAdded');
    } catch (error) {
        return res.status(501).send('error reported ')
    }
    
    
    }

    async function likeCommentReply(req,res){
        const {username,postId,commentId,replyId,commentObj}=req.body;
        try {
            let replyUsername=''
            let action='';
            let notiObj={};
            const user = await Posts.findOne({username});
           user.posts.find((post)=>{
                if(post.postId===postId){
                    post.comments.find((comment)=>{
                        if(comment.commentId===commentId){
                            comment.replies.find((reply)=>{
                                if(reply.commentId===replyId){
                                    replyUsername=reply.username;
                            const sameUser=(username===commentObj.username&&'their post')||(username===reply.username&&'your post')||(username!==reply.username&&username!==commentObj.username&&`someone's post`);
                           action= commentObj.typeOfLike==='Like'?`likes your reply on ${sameUser}`:`reacted to your reply on ${sameUser}`;
                         notiObj={userInfo:commentObj.userInfo,notiId:postId+replyId,
                            action,captionOrCommentString:reply.commentString,
                            reactionEmoji:commentObj.typeOfLike,postId,postUsername:username,
                            read:false,date:new Date()}
                                  return reply.likesOnComment.push(commentObj)
                                }
                              })
                        }
                      })
                }})
            const newUser= new Posts(user)
        await newUser.save();
        if(commentObj.username!==replyUsername){
            const noti = await Notification.findOne({username:replyUsername});
            noti.newNoti=noti.newNoti+1;
            noti.notifications.push(notiObj)
            await new Notification(noti).save()
            }
            return res.send('comment reply liked by user');
        } catch (error) {
            return res.status(501).send('error reported ')
        }
        
        
        }
    
    async function updateLikeOnCommentReply(req,res){
        const {username,likedByUsername,postId,commentId,replyId,typeOfLike}=req.body;
        try {

            let action=''
            let replyUsername='';
            const user = await Posts.findOne({username});
           user.posts.find((post)=>{
                if(post.postId===postId){
                    post.comments.find((comment)=>{
                        if(comment.commentId===commentId){
                            comment.replies.find((reply)=>{
                                if(reply.commentId===replyId){
                                    replyUsername=reply.username;
                                    const sameUser=(username===likedByUsername&&'their post')||(username===reply.username&&'your post')||(username!==reply.username&&username!==likedByUsername&&`someone's post`);
                                    action= typeOfLike==='Like'?`likes your reply on ${sameUser}`:`reacted to your reply on ${sameUser}`;
                                  reply.likesOnComment.find((likes)=>{
                                    return  likes.username===likedByUsername&&(likes.typeOfLike=typeOfLike)
                                  })
                                }
                              })
                          
                        }
                      })
                }})
            const newUser= new Posts(user)
        await newUser.save();
        if(replyUsername!==likedByUsername){
            const noti = await Notification.findOne({username:replyUsername});
            noti.notifications.find((notiObj)=>{if(notiObj.notiId===postId+replyId){
            notiObj.reactionEmoji=typeOfLike;
            notiObj.action=action;
            notiObj.date=new Date();
            }})
            await new Notification(noti).save()
            }
            return res.send('comment reply like updated');
        } catch (error) {
            return res.status(501).send('error reported ')
        }
        
        
        }
    
    async function removeLikeFromCommentReply(req,res){
        const {username,likedByUsername,postId,commentId,replyId}=req.body;
        try {
            let replyUsername='';
            const user = await Posts.findOne({username});
           user.posts.find((post)=>{
                if(post.postId===postId){
                    post.comments.find((comment)=>{
                        if(comment.commentId===commentId){
                            comment.replies.find((reply)=>{
                                if(reply.commentId===replyId){
                                    replyUsername=reply.username;
                                  reply.likesOnComment=reply.likesOnComment.filter((likes)=>{
                              return likes.username!==likedByUsername
                                  })
                                }
                              })
                        }
                      })
                }})
            const newUser= new Posts(user)
        await newUser.save();
        if(replyUsername!==likedByUsername){
            const noti = await Notification.findOne({username:replyUsername});
            noti.newNoti=noti.newNoti-1;
          noti.notifications=noti.notifications.filter(notiObj=>notiObj.notiId!==postId+replyId)
          await new Notification(noti).save()
            }
            return res.send('comment reply like Removed');
        } catch (error) {
            return res.status(501).send('error reported ')
        }
        
        
        }
    

// deleting post ,comment and replies from db


async function deletePostFromDb(req,res){
    const {username,postId}=req.body;
    try {
            const noti = await Notification.findOne({username});
            noti.newNoti=noti.newNoti-1;
          noti.notifications=noti.notifications.filter(notiObj=>notiObj.notiId!==postId)
          await new Notification(noti).save()
            

        const user = await Posts.findOne({username});
        user.posts=user.posts.filter((post)=>{
            return post.postId!==postId
          })
        const newUser= new Posts(user)
    await newUser.save();
        return res.send('post Deleted successfully');
    } catch (error) {
        return res.status(501).send('error reported ')
    }}


    async function deleteCommentFromDb(req,res){
        const {username,postId,commentId}=req.body;
        try {

         let commentUsername=''
                
            const user = await Posts.findOne({username});
           user.posts.find((post)=>{
                if(post.postId===postId){
                    post.comments=post.comments.filter((comment)=>{
                        if(comment.commentId===commentId){
                            commentUsername=comment.username;
                            post.totalComments=post.totalComments-(comment.replies.length+1);
                           }
                        return comment.commentId!==commentId
                      })
                }})
            const newUser= new Posts(user)
        await newUser.save();
        const noti = await Notification.findOne({commentUsername});
        noti.newNoti=noti.newNoti-1;
      noti.notifications=noti.notifications.filter(notiObj=>notiObj.notiId!==commentId)
      await new Notification(noti).save()
            return res.send('comment Deleted successfully');
        } catch (error) {
            return res.status(501).send('error reported ')
        }}

        async function deleteCommentReplyFromDb(req,res){
            const {username,postId,commentId,replyId}=req.body;
            try {
                
                const user = await Posts.findOne({username});
               user.posts.find((post)=>{
                    if(post.postId===postId){
                        post.totalComments=post.totalComments-1;
                        post.comments.find((comment)=>{
                            if(comment.commentId===commentId){
                              comment.replies=comment.replies.filter((reply)=>{
                               return reply.commentId!==replyId
                              })
                            }
                          })
                    }})
                const newUser= new Posts(user)
            await newUser.save();
                return res.send('reply deleted sucessfully');
            } catch (error) {
                return res.status(501).send('error reported ')
            }}
        
















export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
const {action}=req.query;
switch(action){
case 'likePost':{return likePost(req,res)}
case 'updateLikeTypeOnPost':{return updateLikeTypeOnPost(req,res)}
case 'removeLikeFromPost':{return removeLikeFromPost(req,res)}
case 'addComment':{return addComment(req,res)}
case 'likeComment':{return likeComment(req,res)}
case 'updateLikeOnComment':{return updateLikeOnComment(req,res)}
case 'removeLikeFromComment':{return removeLikeFromComment(req,res)}
case 'addCommentReply':{return addCommentReply(req,res)}
case 'likeCommentReply':{return likeCommentReply(req,res)}
case 'updateLikeOnCommentReply':{return updateLikeOnCommentReply(req,res)}
case 'removeLikeFromCommentReply':{return removeLikeFromCommentReply(req,res)}
case 'deletePostFromDb':{return deletePostFromDb(req,res)}
case 'deleteCommentFromDb':{return deleteCommentFromDb(req,res)}
case 'deleteCommentReplyFromDb':{return deleteCommentReplyFromDb(req,res)}
default: {
    return res.status(400).end();
  }
}



}