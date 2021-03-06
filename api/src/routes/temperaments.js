// Importo el modelo de temperamentos de Sequalize 👇
const { Breeds, Temperaments } = require('../db.js');

//👇 preparo el api_key de .env 👇
const {
    API_KEY
} = process.env;

var express = require("express");
var router = express.Router();

//👇 Requiero Fetch que hasta ahora es el que se usar 👇
const fetch = require("node-fetch") 

router.get('/obtemperaments', async (req,res) => {

let temp=[]
await fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`) // Obtengo todos los temperamentos que se encuentran en las razas
    .then(response => response.json())
    .then(json => { console.log("Agrego los temperamentos a un array previo a guardarlos...")
        json.map(tempe => {
            if (tempe.temperament) { // Solo si la raza tiene temperamentos
                let temps = tempe.temperament.split(', '); // Como puede haber mas de un temperamento los separo por comma y espacio
                temps.map(t => { // creo un nuevo array con los temperamentos
                    if (!temp.find(tp => tp.name === t)) { // y si aún no está el temperamento en el array
                        temp.push({ name: t }); // lo agrego 
                        console.log(t)
                    }
                }); 
            }
        })
    })
    .then(() => { 
        console.log("Empiezo a guardar los temperamentos...")
        temp.map(async t => {  // los datos obtenidos en la promesa anterior
            await Temperaments.findOrCreate({ // Si ya está en la tabla queda o lo agrego si aun no está
                where: {
                    name: t.name
                }
            })
        })
        res.status(200).send("Guardado con exito")
    })
    .catch(err => console.error(err)) } )


router.get('/temperament', async function(req, res) {

    await Temperaments.findAll()
        .then(result => res.json(result))
})

module.exports = router;