// Mongoose required for schemas
const { Schema, model, Types } = require("mongoose");

//userschema
const userSchema = new Schema(
  {
    // The username of the user, required and with length and uniqueness constraints
    username: {
      type: String,
      required: true,
      maxlength: 15,
      minLength: 3,
      unique: true,
      trim: true,
    },
    email: {
      // The email of the user, required, unique, and must match the regex pattern
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    friends: [
      {
        // An array of IDs of the user's friends, with a reference to the User model
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thoughts: [
      {
        // An array of IDs of the user's thoughts, with a reference to the Thought model
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },

  // This object lets me use virtuals into JSON, and prevents the auto-generation of an id field
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Virtual property to get the count of friends
userSchema.virtual("frienCount").get(function () {
  return this.friends.length;
});
// Define the User model using the user schema
const User = model("User", userSchema);
// Export the model
module.exports = User;
