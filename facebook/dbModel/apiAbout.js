import mongoose, { mongo } from "mongoose";
const Schema =mongoose.Schema;
const schema = Schema({
 username:{type:String},
  workAndEdu:{type:Object},
  placeLived:{type:Object},
  contactAndBasicInfo:{type:Object},
  userBasicInfo:{type:Schema.Types.ObjectId,ref:'allUsers'},
  familyAndRel:{type:Object},
  details:{type:Object},

});

const aboutModel = () => {
  if (!mongoose.models.aboutUser) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("aboutUser", schema);
  } else {
    return mongoose.models.aboutUser;
  }
};

export default aboutModel();
