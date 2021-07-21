const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username:{type:String},
  latestFeed:{type:Array},
});

const newsFeedModel = () => {
  if (!mongoose.models.newsFeed) {
    //   console.log("chal raha h bhai if block");
    return mongoose.model("newsFeed", schema);
  } else {
    return mongoose.models.newsFeed;
  }
};

module.exports=newsFeedModel();
