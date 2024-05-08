// const  mongoose  = require('mongoose') ;
import mongoose from "mongoose";

const connectLocalDB = () => {
  mongoose
    .connect(
      "mongodb+srv://ngovanvu203:ngovanvu203@atlascluster.xeqf9ni.mongodb.net/demo"
    )
    .then(() => console.log("Kết nối thành công"))
    .catch((err) => console.log(err));

  const DBConnection = mongoose.connection;

  DBConnection.on("error", (err) => console.log(`Kết nối thất bại ${err}`));
  DBConnection.once("open", () => console.log("Kết nối db thành công"));
};

export { connectLocalDB };
