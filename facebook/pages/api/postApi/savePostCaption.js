
import { applySession } from "next-iron-session";
import Posts from "../../../dbModel/apiPosts";
import Friends from '../../../dbModel/apiFriends';
import NewsFeed from '../../../dbModel/apiNewsFeed'
import cookieInfo from "../../../utils/cookie";
import database from "../../../utils/dbConnect";


database.connect();


export default async (req, res) => {
    await applySession(req, res, cookieInfo);
    if (!req.session || !req.session.get("user")) {
      return res.status(403).send("unathorized");
    }
const {username}=req.query;
const {caption,audience,_id}=req.body;
const postId=new Date()+Math.floor(Math.random() * 1123411213421);
console.log(caption);
try {
    const userPosts=await Posts.findOne({username});
  userPosts.posts.push({userInfo:_id,postId,caption,audience,date:new Date(),
    media:{},totalComments:0})
    const newPost=new Posts(userPosts);
    await newPost.save();
     res.send(postId);

const myFriends = await Friends.findOne({username});
myFriends.friends.map(async(friend)=>{
  const newsFeed= await NewsFeed.findOne({username:friend.username});
  newsFeed.latestFeed.push({username,postId,date:new Date()})
  await new NewsFeed(newsFeed).save();
})
const newsFeedUser= await NewsFeed.findOne({username});
newsFeedUser.latestFeed.push({username,postId,date:new Date()})
await new NewsFeed(newsFeedUser).save();
} catch (error) {
  res.status(501).send('errer')
    console.log(error.message)
}


}