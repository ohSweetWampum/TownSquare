// Mongoose and dayjs library required for schemas and date formatting
const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");
// Reaction schema
const reactionSchema = new Schema(
  {
    // A unique ID made for each reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // The body of the reaction is required and with a length limit
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter to format the date using dayjs
      get: (createdAt) => dayjs(createdAt).format("MMM DD, YYYY [at] hh:mm A"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
// Thought schema for defining each thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dayjs(createdAt).format("MMM DD, YYYY [at] hh:mm A"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// Virtual property to get the count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
