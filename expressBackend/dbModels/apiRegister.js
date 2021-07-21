const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
  fname: { type: String, required: true },
  sname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  dob: { type: Object, required: true },
  gender: { type: String, required: true },
  username: { type: String, required: true },
 
});

const getRegisterModel = () => {
  if (!mongoose.models.allUsers) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("allUsers", registerSchema);
  } else {
    return mongoose.models.allUsers;
  }
};

module.exports= getRegisterModel();
