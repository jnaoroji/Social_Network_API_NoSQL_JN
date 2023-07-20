const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user + associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ username: user.username });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a new friend to the user's friend list
  async addFriends(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Assuming that the friendId is provided in the request body
      const { friendId } = req.body;

      // Check if the friendId is valid or exists in the database
      const friend = await User.findOne({ _id: friendId });
      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID' });
      }

      // Add the friend to the user's friend list
      user.friends.push(friendId);
      await user.save();

      res.json({ message: 'Friend added successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
    // Remove a friend from a user's friend list
    async removeFriends(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        // Assuming that the friendId is provided in the request parameters
        const { friendId } = req.params;
  
        // Check if the friendId is valid or exists in the database
        const friend = await User.findOne({ _id: friendId });
        if (!friend) {
          return res.status(404).json({ message: 'No friend with that ID' });
        }
  
        // Remove the friend from the user's friend list
        const friendIndex = user.friends.indexOf(friendId);
        if (friendIndex !== -1) {
          user.friends.splice(friendIndex, 1);
          await user.save();
        }
  
        res.json({ message: 'Friend removed successfully!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
};
