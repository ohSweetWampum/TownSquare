const { Schema, model, Types } = require("mongoose");

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
