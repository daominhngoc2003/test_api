import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const informationSchema = mongoose.Schema(
  {
    preface: {
      type: String,
      require: true,
    },
    text1: {
      type: String,
      require: true,
    },
    text2: {
      type: String,
      require: true,
    },
    nickname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    github: {
      type: String,
      require: true,
    },
    introduce: {
      type: String,
      require: true,
    },
    avatar: {
      type: Array,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    education: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    overview: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const plugins = [mongoosePaginate, mongooseDelete];
plugins.forEach((plugin) => {
  informationSchema.plugin(plugin, {
    deletedAt: true,
    overrideMethods: true,
  });
});

export default mongoose.model("Information", informationSchema);
