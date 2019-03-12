import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserShecema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserShecema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserShecema);

export default model;
