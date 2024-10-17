import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    email : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type : String,
      required : true
    },
    firstName : {
      type : String,
      required : false
    },
    lastName : {
      type : String,
      required : false
    },
    type :{
      type : String,
      required : true,
      default : "customer"
    },
    whatsApp : {
      type : String,
      required : false
    },
    phone : {
      type : String,
      required : false
    },
    disabled : {
      type : Boolean,
      required : true,
      default : false
    },
    emailVerified : {
      type : Boolean,
      required : true,
      default : false
    }
  }
)

const User = mongoose.model("users" , userSchema)

export default User;

