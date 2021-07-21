import { applySession } from "next-iron-session";
import Posts from "../../../dbModel/apiPosts";
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";



database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
const {username,postId}=req.body;
try {
    const myPosts = await Posts.findOne({username}).populate(`posts.userInfo posts.likes.userInfo posts.comments.userInfo 
    posts.comments.likesOnComment.userInfo posts.comments.replies.userInfo  posts.comments.replies.replyTo  
    posts.comments.replies.likesOnComment.userInfo,username fname sname _id `);

   const postFound =  myPosts.posts.find((post)=>{return post.postId===postId});
   return postFound?res.send({post:postFound,allPostLength:myPosts.posts.length}):res.send({fail:true})

} catch (e) {
    console.log(e.message);
    return res.status(501);
}


}