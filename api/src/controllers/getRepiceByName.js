const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = process.env;

const getRepiceByName = async (req,res) => {
    const { name } = req.query;
   try {
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`);
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
} else {
          return res.status(200).send(allRecipes);
        }  
    
} catch (err){
    return res.status(400).send(err.message);
}
}

module.exports = getRepiceByName;