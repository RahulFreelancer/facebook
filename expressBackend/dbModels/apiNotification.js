const mongoose= require("mongoose");
const Schema =mongoose.Schema;
const schema = Schema({
 username:{type:String},
 notifications:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'}
,notiId:String,action:String,captionOrCommentString:String,reactionEmoji:String,
postId:String,postUsername:String,read:Boolean,date:Object,
}],
 newNoti:{type:Number},
});

const notiModel = () => {
  if (!mongoose.models.notifications) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("notifications", schema);
  } else {
    return mongoose.models.notifications;
  }
};

module.exports= notiModel();
