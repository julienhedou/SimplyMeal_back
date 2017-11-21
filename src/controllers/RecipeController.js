// Controller de la route '/recipes'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import RecipeModel from "../models/RecipeModel";
var categories = ['Healthy','Gourmand','Noel','Automne'];

const recipes = () => {
  // On fait appel à la fonction getRecipes du model
  // Celle ci renvoie tous les recipes présents en base
  return RecipeModel.getRecipes()
  .then((data) => {
    // On récupère ici data qui est une liste de recipes

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noRecipesError'
      throw new Error('noRecipesError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let recipe of data){
      // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
      response[response.length] = {
        id: recipe._id,
        name: recipe.name,
        description_global: recipe.description_global,
        category: recipe.category,
        ingredients: recipe.ingredients,
        image: recipe.image,
        description_detail: recipe.description_detail
      }

    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'name');
  });
}

const recipe = (_id) => {
  // On fait appel à la fonction getRecipe du model
  // Celle ci renvoie le recipe dont l'id est _id
  return RecipeModel.getRecipe(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de recipes

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noRecipeError'
      throw new Error('noRecipeError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      name: data.name,
      description_global: data.description_global,
      category: data.category,
      ingredients: data.ingredients,
      image: data.image,
      description_detail: data.description_detail
    };
    return response;
  });
}

const createRecipe = (recipe) => {
  // On fait appel à la fonction createRecipe du model
  // Celle ci renvoie le recipe dont l'id est _id
    if (!categories.includes(recipe.category)) {
      // Si data est vide, nous renvoyons l'erreur 'noRecipesError'
      throw new Error('wrongCategory');
    }

    return RecipeModel.createRecipe(recipe);
}

const updateRecipe = (id, recipe) => {
  // On fait appel à la fonction updateRecipe du model
  // Celle ci renvoie le recipe dont l'id est _id
  return RecipeModel.updateRecipe(id, recipe);
}

const deleteRecipe = (id) => {
  // On fait appel à la fonction deleteRecipe du model
  // Celle ci renvoie le recipe dont l'id est _id
  return RecipeModel.deleteRecipe(id);
}

export default {
  // Controller des views
  getRecipes: (req, res) => {
    recipes()
    .then((data) => {
      // data contient une liste de recipes
      res.render('recipe/recipes', { recipes: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRecipe: (req, res) => {
    recipe(req.params.id)
    .then((data) => {
      res.render('recipe/recipe', { recipe: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateRecipe: (req, res) => {
    res.render('recipe/createRecipe');
  },

  postCreateRecipe: (req, res) => {
    let recipe = {
      name: req.body.name,
      description_global: req.body.description_global,
      category: req.body.category,
      ingredients: req.body.ingredients,
      image: req.body.image,
      description_detail: req.body.description_detail
    };

    createRecipe(recipe)
    .then((data) => {
      res.redirect('/recipes');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateRecipe: (req, res) => {
    recipe(req.params.id)
    .then((data) => {
      res.render('recipe/updateRecipe', { recipe: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateRecipe: (req, res) => {
    let recipe = {
      name: req.body.name,
      description_global: req.body.description_global,
      category: req.body.category,
      ingredients: req.body.ingredients,
      image: req.body.image,
      description_detail: req.body.description_detail
    };

    updateRecipe(req.params.id, recipe)
    .then((data) => {
      res.redirect('/recipes');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteRecipe: (req, res) => {
    deleteRecipe(req.params.id)
    .then((data) => {
      res.redirect('/recipes');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getRecipesApi: (req, res) => {
    recipes()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de recipes
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRecipeApi: (req, res) => {
    recipe(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateRecipeApi: (req, res) => {
    let recipe = {
      name: req.body.name,
      description_global: req.body.description_global,
      category: req.body.category,
      ingredients: req.body.ingredients,
      image: req.body.image,
      description_detail: req.body.description_detail
    };

    createRecipe(recipe)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateRecipeApi: (req, res) => {
    let recipe = {
      name: req.body.name,
      description_global: req.body.description_global,
      category: req.body.category,
      ingredients: req.body.ingredients,
      image: req.body.image,
      description_detail: req.body.description_detail
    };

    updateRecipe(req.params.id, recipe)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteRecipeApi: (req, res) => {
    deleteRecipe(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
