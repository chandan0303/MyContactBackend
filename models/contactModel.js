const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      reuired:true,
      ref:"User"
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
    },
    phone: {
      type: Number,
      required: [true, "Please add the mobile number"],
    },
  },
  {
    timestamps: true,// Automatically adds createdAt and updatedAt fields to the schema
  }
);
module.exports=mongoose.model("Contact",contactSchema)