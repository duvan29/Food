const { Router } = require('express');
const { getRecetass, getId } = require('./controllers');


const recipesRouter = Router();


recipesRouter.get('/',getRecetass);

recipesRouter.get('/:id', getId);




module.exports=  recipesRouter;