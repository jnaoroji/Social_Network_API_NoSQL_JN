const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    console.log("you are creating a thought for this user");
    try {
      const thought = await Thought.create(req.body);
      console.log(req.body);
      const userId = (req.params.userId);
      await User.findOneAndUpdate({_id: userId}, { $push: { thoughts: thought._id } });
      res.json(thought);
      console.log(thought);
      console.log(User);
    

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought
  // async deleteThought(req, res) {
  //   try {
  //     const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

  //     if (!thought) {
  //       res.status(404).json({ message: 'No thought with that ID' });
  //     }

  //     await Thought.deleteMany({ _id: { $in: User.thoughts } });
  //     res.json({ message: 'user and thoughts deleted!' });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  // Update a thought
  // async updateThought(req, res) {
  //   try {
  //     const thought = await Thought.findOneAndUpdate(
  //       { _id: req.params.thoughtId },
  //       { $set: req.body },
  //       { runValidators: true, new: true }
  //     );

  //     if (!thought) {
  //       res.status(404).json({ message: 'No thought with this id!' });
  //     }

  //     res.json(thought);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
  //create a reaction to be stored in a single thoughts reactions array
  async addReaction(req, res) {
    console.log('You are adding a reaction to this thought');
    console.log(req.body);
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    // Remove a reaction by the reactions id field
    async removeReaction(req, res) {
      console.log('You are removing a reaction on this thought');
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          // { $pull: { reactions: req.params.reactionId } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // async removeFriend(req, res) {
    //   try {
    //     const user = await User.findOneAndUpdate(
    //       { _id: req.params.userId },
    //       { $pull: { friends: req.params.friendId  } },
    //       { runValidators: true, new: true }
    //     );
  
    //     if (!user) {
    //       return res
    //         .status(404)
    //         .json({ message: 'No user found with that ID :(' });
    //     }
  
    //     res.json(user);
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    // }, 
};
