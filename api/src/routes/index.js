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
fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
        json.map(tempe => {
            if (tempe.temperament) {
                let temps = tempe.temperament.split(', ');
                temps.map(t => {
                    if (!temp.find(tp => tp.name === t)) {
                        temp.push({ name: t });

                    }
                });
            }
        })
    })
    .then(() => {
        temp.map(t => {
            console.log(t.name)
            Temperaments.findOrCreate({
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