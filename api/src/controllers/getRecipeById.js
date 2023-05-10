const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;

// Definimos una función asincrónica para obtener una receta por su id
const getRecipeById = async (req,res) => {
try {
// Obtenemos el id de la receta desde los parámetros de la solicitud
const { id } = req.params;
    // // Obtenemos de la base de datos la información de la receta con el id correspondiente,
    // // incluyendo los tipos de dietas asociados a ella
    // const getDbInfoId = await Recipe.findAll({
    //     include: {
    //         model: Diet,
    //         attributes: ['name'],
    //         through: {
    //             attributes: [],
    //         }
    //     }
    // });

    

    // Comprobamos que el id tenga el formato correcto
    if ( id > 1095753 ) {
        const getDbInfoId = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });    
        // Si el id es válido, obtenemos la información de la receta desde la base de datos
        let dbRecipesById =  getDbInfoId;            
        return res.status(200).json(dbRecipesById);
    } else { 
        // Realizamos una solicitud a la API de Spoonacular para obtener la información de la receta
        const getApiById = await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}number=100`);
        // Si el id no es válido, obtenemos la información de la receta desde la API de Spoonacular
        let apiRecipesById =  getApiById;
        if (apiRecipesById.data.id) {
            // Si la receta existe en la API, creamos un objeto con la información que necesitamos
            let recipeDetails =  {                    
                image: apiRecipesById.data.image,
                name: apiRecipesById.data.title,
                dishTypes: apiRecipesById.data.dishTypes,
                dietTypes: apiRecipesById.data.diets,
                summary: apiRecipesById.data.summary,
                score: apiRecipesById.data.spoonacularScore,
                healthScore: apiRecipesById.data.healthScore,
                steps: apiRecipesById.data.analyzedInstructions[0]?.steps.map(e => {
                    return {
                        number: e.number,
                        step: e.step
                    }
                })
            }
            return res.status(200).send(recipeDetails); 
        }
    } 
} catch (err) {
    // Si ocurre un error, devolvemos un estado 404 y un mensaje de error
    return res.status(404).send(err.message);
}
}

// Exportamos la función
module.exports = getRecipeById;