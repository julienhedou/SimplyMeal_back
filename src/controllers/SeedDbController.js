// Controller de la route '/shows'
import Errors from "../helpers/Errors";

// Récupération du model
import RecipeModel from "../models/RecipeModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      RecipeModel.deleteRecipes(),
    ])
    .then((data) => {
      return Promise.all([
        RecipeModel.seedRecipes(),
      ]);
    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};