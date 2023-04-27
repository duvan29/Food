const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;

const getRecipeById = async (req,res) => {
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

const getApiById = await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
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

module.exports = getRecipeById;