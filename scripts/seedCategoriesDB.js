const mongoose = require("mongoose");
const db = require("../models");

// next two lines load dot env variables (only needed for dev)
// const dotenv = require("dotenv")
// dotenv.config({ path: "./config/config.env" })

const connectDB = async () => {
  try {
    const conn = await 
    mongoose.connect(process.env.MONGO_URI || 
      "mongodb://localhost/confessions", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Seed records sent to: ${conn.connection.host}`)
  } catch (err) {
      console.error(err)
      process.exit(1)
  };
};

connectDB();

const categoriesSeed = [
  {
    name: "Crushes"
  },
  {
    name: "Food"
  },
  {
    name: "Gym"
  },
  {
    name: "Lies"
  },
  {
    name: "School"
  },
  {
    name: "Work"
  }
];

db.Categories
  .deleteMany({})
  .then(() => db.Categories.collection.insertMany(categoriesSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });