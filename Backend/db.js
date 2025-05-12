const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const UserSchema = new Schema({
  username: {type: String, required: true, unique: true, trim: true, minlength: 2, maxlength: 20, lowercase: true},
  name: {type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
  email: {type: String, required: true, unique: true, trim: true, lowercase: true},
  password: {type: String, required: true, minlength: 4},
});


const AccountSchema = new Schema({
  userId: {type: ObjectId, required: true, ref: "users"},
  balance: {type: Number, required: true}
})


const UserModel = mongoose.model("users", UserSchema);

const AccountModel = mongoose.model("Accounts", AccountSchema);




module.exports = { UserModel, AccountModel };