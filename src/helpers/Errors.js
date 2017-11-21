// Liste des erreurs que l'API peut renvoyer

const list = {
  noRecipesError: {
    code: 500,
    error: 'noRecipesError',
    error_description: 'La base ne contient pas de recettes'
  },
  noRecipeError: {
    code: 500,
    error: 'noRecipeError',
    error_description: 'Cette recette n\'existe pas'
  },
  wrongCategory: {
    code : 500,
    error: 'wrongCategory',
    error_description: 'This is not a correct category'
  }
};

export default (err) => {
  if (err instanceof Error && err.message){
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};