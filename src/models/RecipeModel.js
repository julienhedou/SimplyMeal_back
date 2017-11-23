// Model de la route '/shows'

import mongoose from "mongoose";
import Errors from "../helpers/Errors";
mongoose.Promise = global.Promise;

import RecipeSeeds from "../helpers/RecipeSeeds";

var categories = {values : ['Healthy','Gourmand','Noël','Automne'],
                message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
}



var ingredient = {
    name : 'carrot',
    quantity : 1,
    unit :''
};



let Schema = new mongoose.Schema({
  name: { type: String, required: true},         // le nom de la recette
  description_global: { type: String },// description en deux lignes
  category: {type: String, enum: categories, required: true},     // categorie (healthy, groumand, noel)
  ingredients: { type: Array},     // la liste des ingrédients avec la quantité et unit de chaque ingédient
  image: { type: String },        // l'url de l'image
  description_detail: {type: String}
});


let Model = mongoose.model('Recipe', Schema);

export default {
  seedRecipes: () => {
    let promises = [];
    for (let recipe of RecipeSeeds){
      promises[promises.legth] = Model.create(recipe);
    }
    return Promise.all(promises);
  },

  getRecipes: () => {
    return Model.find({}).exec();
  },

  getRecipe: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createRecipe: (recipe) => {
    return Model.create({
      name: recipe.name,
      description_global: recipe.description_global,
      category: recipe.category,
      ingredients: recipe.ingredients,
      image: recipe.image,
      description_detail: recipe.description_detail
    });
  },

  updateRecipe: (_id, recipe) => {
    return Model.findOneAndUpdate({ _id }, {
     name: recipe.name,
     description_global: recipe.description_global,
     category: recipe.category,
     ingredients: recipe.ingredients,
     image: recipe.image,
     description_detail: recipe.description_detail
    }, {upsert: true}).exec();
  },

  deleteRecipes: () => {
    return Model.remove({}).exec();
  },

  deleteRecipe: (_id) => {
    return Model.remove({ _id }).exec();
  },
};
