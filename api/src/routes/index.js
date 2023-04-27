const { Router } = require('express');
// Importar todos los routers;

const getRecipeById = require('../controllers/getRecipeById');
const getRepiceByName = require('../controllers/getRepiceByName');

const router = Router();

// Configurar los routers

router.get('/recipes', getRepiceByName);
router.get('/recipes/:id', getRecipeById);


module.exports = router;
