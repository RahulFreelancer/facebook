
import { applySession } from "next-iron-session";
import Posts from "../../../dbModel/apiPosts";
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";
import fs from 'fs';


database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
    const {username}=req.body;
try {
    const user = await Posts.findOne({username}).
    populate(`posts.userInfo posts.likes.userInfo posts.comments.userInfo 
    posts.comments.likesOnComment.userInfo posts.comments.replies.userInfo posts.comments.replies.replyTo 
    posts.comments.replies.likesOnComment.userInfo,username fname sname _id`);
return res.send(user.posts)
} catch (error) {
    res.status(501).send('internal problem')
}

}