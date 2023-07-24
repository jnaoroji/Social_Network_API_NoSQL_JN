//seed data for generating random usernames
const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

//seed data for generating random thoughts
const thoughtDescriptions = [
  'I wonder what life would be like if we could communicate with animals and understand their perspectives.',   
  'The smell of freshly baked cookies always brings back nostalgic memories.', 
  'Time seems to pass differently when youre fully engaged in something you love.',
  'The night sky is a mesmerizing canvas of stars, each one potentially hosting its own set of planets and life.', 
  'I wish more people would practice empathy and kindness towards one another, the world could be a better place.', 
  'Its fascinating how technology has evolved, and I wonder what groundbreaking innovations await us in the future.', 
  'I should really pick up that book Ive been wanting to read for ages and dive into its world.', 
  'Memories are like pieces of a puzzle, sometimes fitting perfectly, and other times leaving gaps we cant seem to fill.', 
  'Traveling to different countries allows you to experience diverse cultures, broadening your understanding of the world.', 
  'I find solace in nature, and taking a walk in the woods always brings a sense of peace and clarity to my mind.', 
];
// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;


// Function to generate random thoughts that we can add to user object.

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtDescriptions),
    });
  }
  return results;
};
// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };
