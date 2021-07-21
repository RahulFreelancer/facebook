
import mongoose from "mongoose";

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
});

const userDetailsModel = () => {
  if (!mongoose.models.userDetails) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("userDetails", schema);
  } else {
    return mongoose.models.userDetails;
  }
};

export default userDetailsModel();
