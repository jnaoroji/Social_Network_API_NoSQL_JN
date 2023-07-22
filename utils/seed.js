const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    User.get
  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    
    // Get some random thought objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(5);
    //insert into thoughts collection
    await Thought.collection.insertMany(thoughts);
    // get thought ids from array
    const allThoughtIds = thoughts.map((thought) => thought._id);
      

    
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const username = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
    const email = `${username}@email.com`;

    const user = {
      username,
      email,
      thoughts: allThoughtIds, 
    };
    
    users.push(user);

  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // // Add friends to the user collection and await the results
  // for (let i = 0; i < users.length; i++) {
  //   const randomFriendIndex = Math.floor(Math.random() * i); // Selects a random user as a friend
  //   const randomFriend = users[randomFriendIndex];
  //   // console.log(randomFriendIndex);
  //   // console.log(randomFriend._id);
  //   friends = randomFriend._id;
  //   console.log("friend = "+ friends);
  //   // console.log("users" + users)
  //   // Initialize friends array if it doesn't exist
  //   if (!users[i].friends) {
  //     users[i].friends = [];
  //   }
  //   users[i].friends.push(friends);
  //   console.log(users[i].friends);

  // }

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
