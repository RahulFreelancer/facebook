
import { applySession } from "next-iron-session";
import Posts from "../../../dbModel/apiPosts";
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";
import fs from 'fs';
import NewsFeed from "../../../dbModel/apiNewsFeed";
import Friends from "../../../dbModel/apiFriends";


database.connect();



export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }

const {username}=req.query;
const{postId,allFilesName}=req.body;
let dir = `./mediaOfAllUsers/${req.session.get("user")._id}/postData/`
try {
    const result = await Posts.findOne({username});
    result.posts.find((post)=>{
   
        if(post.postId===postId){
            allFilesName.forEach(fileName => {
                console.log(fileName);
                fs.unlinkSync(`${dir}/${fileName}`);
            });
        }
    })
    result.posts=result.posts.filter((post)=>{
        post.postId!==postId
    })

    const myFriends = await Friends.findOne({username});
    myFriends.friends.map(async(friend)=>{
      const newsFeed= await NewsFeed.findOne({username:friend.username});
      newsFeed.latestFeed=newsFeed.latestFeed.filter((feed)=>{feed.postId!==postId})
      await new NewsFeed(newsFeed).save();
    })


    const newPosts = new Posts(result);
    await newPosts.save();
    res.send('post deleted successfully')
    
} catch (e) {
    res.status(401).send('bad request')
    console.log(e.message)
}


}