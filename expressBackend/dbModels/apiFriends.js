const mongoose= require("mongoose");

const schema = mongoose.Schema({
  username:{type:String},
  requestSent:{type:Array},
  requestReceived:{type:Array},
  friends:{type:Array},
  sentReqNo:{type:Number},
  recReqNo:{type:Number},
  acceptedByOther:{type:Array},
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

module.exports= friendsModel();
