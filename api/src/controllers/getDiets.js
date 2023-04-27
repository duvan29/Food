const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;

const getDiets = async (req, res) => {
    try {
        const allDiets = await Diet.findAll();
        if (allDiets.length) {
        res.status(200).json(allDiets);
        } else {
        // Hacer un llamado a la API de Spoonacular para obtener un array de objetos con las recetas
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=37`);

        // Crear un nuevo array con valores únicos de diets

        const dietEach = new Set();

        data.results.forEach((dt) => {
            const recipeDiets = dt.diets;
            recipeDiets.forEach((t) => dietEach.add(t));
        });

        // Iterar sobre dietEach y guardar cada dieta en la base de datos, si no existe
        for (let i = 0; i < dietEach.length; i++) {
            await Diet.findOrCreate({
                where: { name: dietEach[i] }
            });
        }

            const promises = Array.from(dietEach).map((name) =>
                    Diet.create({ name })
                  );
            
            await Promise.all(promises);
            
        // Obtener todas las dietas desde la base de datos y enviarlas como respuesta al cliente
        const allDiets = await Diet.findAll();

        res.status(200).send(allDiets);
    }
    } catch (err) {
        return res.status(404).send(err.message);
    }
};


module.exports = getDiets;