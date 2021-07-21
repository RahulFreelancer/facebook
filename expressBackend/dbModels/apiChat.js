const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const schema = Schema({
  username:{type:String},
  newMsgNoti:Number,
  allChats:[
    {username:String,
    userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},
    seen:Boolean,
    chat:[
      {msgId:String,
      from:String,
      to:String,
  userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},
  date:Object,
  seen:Boolean,
  msg:String
}]}]

});

const chatModel = () => {
  if (!mongoose.models.chats) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("chats", schema);
  } else {
    return mongoose.models.chats;
  }
};

module.exports= chatModel();
