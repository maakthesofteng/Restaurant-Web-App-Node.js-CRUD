const mongoose = require("mongoose");
const foodSchema = mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, "Food Name is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    foodPrice: {
      type: Number,
      required: [true, "Food Price is required"]
    },
    ImageUrl: String,
    foodTags: String,
    foodCategory: {
      type: String,
      required: [true, "Food Category is required"]
    },
    code: String,
    isAvailable: {
      type: Boolean,
      default: true
    },
    resturantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant"
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    ratingCount: String
  },
  { timestamps: true }
);


module.exports = mongoose.model("Food", foodSchema)