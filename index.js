const dotenv = require("dotenv/config");
const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI =
  "mongodb+srv://Lebow:km6nevp2@cluster0.ezbcm.mongodb.net/recipe-app?authSource=admin&replicaSet=atlas-uwz0p3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    return Recipe.deleteMany();
  })

  .then(() => {
    //ITERATION 3
    Recipe.create(data);
  })

  .then(() => {
    Recipe.find();
  })
  .then((recipe) => recipe.forEach((recipe) => console.log(recipe.title)))

  .catch((error) => console.log(error))

  //ITERATION 4

  .then(() => {
    Recipe.findOneAndUpdate(
      { title: { $eq: "Rigatoni alla Genovese" } },
      { $set: { duration: 100 } },
      { new: true }
    );
  })

  .then((recipe) => console.log(recipe))

  .then(() => {
    
    //ITERATION 5
    Recipe.deleteOne({ title: "Carrot Cake" }).then((recipe) =>
      console.log(recipe)
    );
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

  mongoose.connection.close()
