
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = Schema({
  username:{type:String},
  requestSent:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},
  fname:String,sname:String,
  username:String,date:Object,sentReqNo:Number}],
  requestReceived:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},fname:String,sname:String,
  username:String,date:Object,seen:Boolean,recReqNo:Number}],
  friends:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'}, fname:String,sname:String,
  username:String,date:Object,sentReqNo:Number,friendNo:Number,seen:Boolean,relation:Object}],
  sentReqNo:{type:Number},
  recReqNo:{type:Number},
  acceptedByOther:[{userInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},fname:String,sname:String,
  username:String,date:Object,sentReqNo:Number,friendNo:Number,seen:Boolean,relation:Object}],
  friendsNotiCount:{type:Number},
  operationType:{type:String},
  friendsCount:{type:Number}
});

const friendsModel = () => {
  if (!mongoose.models.friends) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("friends", schema);
  } else {
    return mongoose.models.friends;
  }
};

export default friendsModel();
