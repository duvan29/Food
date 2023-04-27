const { Recipe, Diet } = require("../db");

const createRecipe = async (req, res) => {
  try {
    const { id, name, image, summary, healthScore, stepByStep, diets } = req.body;
    // Check if recipe already exists
    const recipeExists = await Recipe.findOne({ where: { name } });
    
    if (recipeExists) {
      return res.status(409).json({ message: "Recipe already exists" });
    }

    // Create recipe
    const recipe = await Recipe.create({
      id,
      name,
      image,
      summary,
      healthScore,
      stepByStep,
    });

    for (const diet of diets) {
      const founddiet = await Diet.findOne({
        where: { name: diet },
      });

      if (!founddiet) {
        return res
          .status(400)
          .json({ message: `${diet} does not exist in database` });
      } else {
        await recipe.addDiets(founddiet);
      }
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

module.exports = createRecipe;