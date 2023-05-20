const { Schema, model, Types } = require("mongoose");
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 15,
      minLength: 3,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      matchesThis: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("numberOfFriends").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
