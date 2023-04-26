const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const recipeRouters = require('./routers')
const recipesRouter = require('./routers');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/:id', recipeRouters);
router.use('/recipes', recipesRouter);


module.exports = router;
