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


  // Create empty array to hold the users
  const users = [];
  

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random thought objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(5);
    console.log(thoughts);
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    // const last = fullName.split(' ')[1];
    const username = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
    const email = `${username}@email.com`;

    users.push({
      username, 
      email, 
      thoughts
    });
    
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // // Add thoughts to the collection and await the results
  // await Thought.collection.insertOne({
  //   thoughtText: 'This is my thought',
  //   users: [...users],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(users.thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
