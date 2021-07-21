const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/facebook", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connection successful ");
  } catch (error) {
    console.log("Cant make a connection with database");
  }
}
function connectToDatabase() {
  mongoose.connection.readyState == 0
    ? connectDb()
    : console.log("already connected to db");
}
module.exports= { connect: connectToDatabase };
