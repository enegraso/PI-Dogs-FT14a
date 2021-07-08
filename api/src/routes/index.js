const { Router } = require('express');

// Importo los modelos de Sequalize 👇
const { Dogs, Breeds, Temperaments } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//👇 Requiero Fetch que hasta ahora es el que se usar 👇
const fetch = require("node-fetch")

//👇 preparo el api_key de .env 👇
const {
    API_KEY
} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ruta de temperamentos
let temp = [];
fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`) // Obtengo todos los temperamentos que se encuentran en las razas
    .then(response => response.json())
    .then(json => {
        json.map(tempe => {
            if (tempe.temperament) { // Solo si la raza tiene temperamentos
                let temps = tempe.temperament.split(', '); // Como puede haber mas de un temperamento los separo por comma y espacio
                temps.map(t => { // creo un nuevo array con los temperamentos
                    if (!temp.find(tp => tp.name === t)) { // y si aún no está el temperamento en el array
                        temp.push({ name: t }); // lo agrego 
                    }
                });
            }
        })
    })
    .then(() => {
        temp.map(t => { // los datos obtenidos en la promesa anterior
            Temperaments.findOrCreate({ // Si ya está en la tabla queda o lo agrego si aun no está
                where: {
                    name: t.name
                }
            })
        })
    })
    .catch(err => console.error(err));


router.get('/temperament', async function(req, res) {

    await Temperaments.findAll()
        .then(result => res.json(result))
})

module.exports = router;