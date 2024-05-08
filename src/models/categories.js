import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const plugins = [mongoosePaginate, mongooseDelete];
plugins.forEach((plugin) => {
  categorySchema.plugin(plugin, {
    deletedAt: true,
    overrideMethods: true,
  });
});
export default mongoose.model("Category", categorySchema);
