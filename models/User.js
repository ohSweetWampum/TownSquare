const { Schema, model, Types } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 15,
      minLength: 3,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
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

userSchema.virtual("frienCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
