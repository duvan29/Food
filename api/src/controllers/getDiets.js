const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;

const getDiets = async (req, res) => {
    try {
        // Hacer un llamado a la API de Spoonacular para obtener un array de objetos con las recetas
        const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100`);

        // Crear un nuevo array con todas las dietas de todas las recetas
        const diets = dietsApi.data.results.map(e => e.diets).flat();

        // Crear un nuevo array con valores únicos de diets
        const dietEach = [...new Set(diets)];

        // Iterar sobre dietEach y guardar cada dieta en la base de datos, si no existe
        for (let i = 0; i < dietEach.length; i++) {
            await Diet.findOrCreate({
                where: { name: dietEach[i] }
            });
        }

        // Obtener todas las dietas desde la base de datos y enviarlas como respuesta al cliente
        const allDiets = await Diet.findAll();
        res.status(200).send(allDiets);
    } catch (err) {
        console.log(err);
        return res.status(404).send(err.message);
    }
};

module.exports = getDiets;