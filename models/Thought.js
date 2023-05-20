const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionContent: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dayjs(createdAt).format("MMM DD, YYYY [at] hh:mm A"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new Schema(
  {
    thoughtContent: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    creationDate: {
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

thoughtSchema.virtual("numberOfReactions").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
