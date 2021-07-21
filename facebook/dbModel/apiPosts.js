import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
    username:{type:String},
    posts:[{
        userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},audience:String,
       postId:String,caption:String,date:Object,
       likes:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},
       typeOfLike:'',username:''}],
       comments:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'}
    ,username:String,commentString:String, date:Object,commentId:String,
    likesOnComment:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'}
,typeOfLike:String,username:String}],
    replies:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},username:String,
commentString:String,commentId:String,
date:Object,likesOnComment:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'}
,typeOfLike:String,username:String}],replyTo:{type:Schema.Types.ObjectId,ref:'allUsers'}}]}],
       media:Object,totalComments:Number}],
   });
   schema.set('versionKey', false);
const postModel = () => {
  if (!mongoose.models.posts) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("posts", schema);
  } else {
    return mongoose.models.posts;
  }
};

export default postModel();
