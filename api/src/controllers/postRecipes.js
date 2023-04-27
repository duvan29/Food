const { Recipe, Diet } = require("../db");

const createRecipe = async (req, res) => {
  try {
    const { name, summary, score, healthScore, instructions, diets } = req.body;

    // Check if recipe already exists
    const recipeExists = await Recipe.findOne({ where: { name: name } });

    if (recipeExists) {
      return res.status(409).json({ message: "Recipe already exists" });
    }

    // Create recipe
    const recipe = await Recipe.create({
      name,
      summary,
      score,
      healthScore,
      instructions,
    });

    // Associate recipe with diets
    const dietsList = await Diet.findAll({
      where: { name: diets },
    });

    await recipe.addDiets(dietsList);

    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

module.exports = createRecipe;