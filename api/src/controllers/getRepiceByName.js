const axios = require("axios"); 
const { Diet, Recipe } = require("../db"); 
const { API_KEY } = process.env; 

const getRepiceByName = async (req,res) => { 
    const { name } = req.query; 

   try {
    const recipeApiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`); // Realiza una solicitud a la API externa para obtener información de las recetas.
    const getrecipeApiInfo = await recipeApiUrl.data.results.map(e => { // Mapea los resultados de la respuesta de la API externa para crear un arreglo de objetos con la información de cada receta.
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            dietTypes: e.diets,
            summary: e.summary,
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    
const getdataBaseInfo = 
     await Recipe.findAll({ 
        // Obtiene toda la información de la base de datos, incluidas las relaciones con el modelo Diet.
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
 
const getAllRecipes = async () => { 
    // Función que devuelve un arreglo con la información de todas las recetas (API + BD).
    const recipeApiInfo = getrecipeApiInfo
    const dataBaseInfo = getdataBaseInfo
    const totalInfo = recipeApiInfo.concat(dataBaseInfo);
    
    return totalInfo;
}

let allRecipes = await getAllRecipes() 
// Obtiene toda la información de todas las recetas (API + BD) mediante la función getAllRecipes().    
        
if (name) { 
    // Si se proporciona un nombre de receta en la consulta, se filtran las recetas que contienen ese nombre y se devuelven.
    let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));   
        recipeByName ? res.status(200).send(recipeByName) : res.status(404).send('Recipe not found')
} else { 
    // De lo contrario, se devuelve toda la información de todas las recetas.
          return res.status(200).send(allRecipes);
        }  
    
} catch (err){
    return res.status(400).send(err.message);
}
}

module.exports = getRepiceByName;