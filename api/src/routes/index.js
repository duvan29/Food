const { Router } = require('express');
// Importar todos los routers;
const getRecipeById = require('../controllers/getRecipeById');
const getRepiceByName = require('../controllers/getRepiceByName');
const getDiets = require('../controllers/getDiets');
const createRecipe = require('../controllers/postRecipes');

const router = Router();

// Configurar los routers

router.get('/recipes', getRepiceByName);
router.get('/recipes/:id', getRecipeById);
router.get('/diets', getDiets);
router.post('/recipes', createRecipe);

module.exports = router;
