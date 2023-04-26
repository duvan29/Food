const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;


//traerme por nombre y todas 

const getRecetass = async (req,res) => {
    const { name } = req.query;
   try {
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.results.map(e => {
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
    
const getDbInfo = 
     await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
 
const getAllRecipes = async () => {
    const apiInfo5 = apiInfo
    const dbInfo = getDbInfo
    const totalInfo = apiInfo5.concat(dbInfo);
    
    return totalInfo;
}

let allRecipes = await getAllRecipes()    
        
if (name) {
    let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
   
    
        return res.status(200).send(recipeByName); 
     
    return res.status(404).send('Sorry, recipe not found')
    //ojo revisar esto para sintetizar
} else {
      
          
          return res.status(200).send(allRecipes);
         

        }  
    
} catch (err){
return res.status(400).send(err.message);



}
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//traer por id 


const getId = async (req,res) => {

    try {
        const { id } = req.params 
          
    const getDbInfoId =
     await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });




const getApiById = 
     await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)

                 //ojo autenticacion investigar mejor
            if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
                let dbRecipesById =  getDbInfoId;            
                return res.status(200).json(dbRecipesById)
            } else { 
                apiRecipesById =  getApiById
                if (apiRecipesById.data.id) {
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
            return res.status(400).send(err.message);
        }
    }

///:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
    getRecetass,
    getId
    
};