
const mongoose = require('mongoose');
const schema = mongoose.Schema({
  username:{type:String},
  photos: { type: Array },
  videos: { type: Array },
  profilePhoto: { type: String },
  coverPhoto: { type: String },
  defaultCoverPhoto:{type:String},
  about: { type: Object },
  education: { type: Object },
  defaultProfilePhoto: { type: String },
  allProfilePhotos:{type:Array},
  cropProfilePhoto:{type:String},
  requestSent:{type:Array},
  requestReceived:{type:Array},
  friends:{type:Array},
  sentReqNo:{type:Number},
  recReqNo:{type:Number}
});

const userDetailsModel = () => {
  if (!mongoose.models.userDetails) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("userDetails", schema);
  } else {
    return mongoose.models.userDetails;
  }
};

module.exports= userDetailsModel();
