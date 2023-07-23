const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require ('moment');

const options = {
  timeZone: "Australia/Brisbane",
  hour12: false, // Set to true for 12-hour clock format with AM/PM, false for 24-hour format
};


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      ref: 'User',
      required: true,
    },
    reactions: [reactionSchema], 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


// Initialize the user model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
