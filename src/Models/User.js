import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  countryCode: String,
  phoneNumber: String,
  password: String,
  bgImage:String,
});

const User = mongoose.model('User', userSchema);

export { User };