const { Breeds, Temperaments } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    API_KEY
} = process.env;

var express = require("express");
var router = express.Router();

const fetch = require("node-fetch")

let idRaza = 300
router.post('/dogs', async function(req, res) {

    try {
        const { name, heightmin, heightmax, weightmin, weightmax, years, temper } = req.body;
        // console.log(req.body)
        let newBreed = await Breeds.create({
                id: idRaza++,
                name,
                heightmin,
                heightmax,
                weightmin,
                weightmax,
                years,
            })
            // console.log(newRaza)

        await newBreed.setTemperaments(temper)

    } catch (error) {
        res.status(500).send(error)
    }
})


router.get('/dogs', async function(req, res) {
    // query: despues del ?
    var { name } = req.query;
    if (name) {
        fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
            .then(data => data.json())
            .then(async json => {
                let raza = await Breeds.findAll({
                    include: [{
                        model: Temperaments,
                        required: true
                    }]
                });

                raza.map(dato => {
                    if (dato.dataValues.name.includes(name)) {
                        let temperament = dato.dataValues.temperamentos.map(temp => {
                            return temp.dataValues.nameT;
                        })
                        dato.dataValues.temperamentos = temperament[0];
                        json.push(dato.dataValues)
                    }
                });

                if (json.length > 0) {

                    let razaEnc = [];

                    for (let i = 0; i < json.length; i++) {
                        let raza1 = {
                            id: json[i].id,
                            name: json[i].name,
                            img: `https://cdn2.thedogapi.com/images/${json[i].reference_image_id}.jpg` || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                            temperament: json[i].temperament || json[i].temperamentos
                        }
                        razaEnc.push(raza1);
                    }
                    res.json(razaEnc)
                }

            })


    } else {

        fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
            .then(data => data.json())
            .then(async json => {

                let savedBreeds = await Breeds.findAll({
                    include: Temperaments
                });

                savedBreeds.map(breed => {
                    console.log(breed.dataValues)
                    let temperament = breed.dataValues.temperaments.map(temp => {
                        return temp.dataValues.nameT;
                    })
                    breed.dataValues.temperaments = temperament[0];
                    json.push(breed.dataValues)
                });

                let raza2 = json.map(dato => {
                    return {
                        id: dato.id,
                        img: dato.image && dato.image.url || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                        name: dato.name,
                        temperament: dato.temperament || dato.temperamentos
                    }
                });

                raza2.sort((a, b) => (a.name > b.name) ? 1 : -1)

                res.json(raza2)
            })
    }
})

router.get('/dogs/:idRaza', async function(req, res) {

    var { idRaza } = req.params;
    fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
        .then(data => data.json())
        .then(async json => {

            let raza = json.find(dato => dato.id === parseInt(idRaza));
            if (raza) {
                return res.json({
                    img: raza.image && raza.image.url || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                    name: raza.name || 'No Encontrado',
                    temperament: raza.temperament || raza.temperamentos || 'No Encontrado',
                    weight: raza.weight.metric || 'No Encontrado',
                    height: raza.height.metric || 'No Encontrado',
                    life_span: raza.life_span || 'No Encontrado',
                })
            } else {
                let razaC = await Breeds.findAll({
                    include: [{
                        model: Temperaments,
                        required: true
                    }]
                });

                // console.log(userBreeds)
                let creadaR = razaC.find(dato => dato.dataValues.id === parseInt(idRaza));
                if (creadaR) {
                    return res.json({
                        img: creadaR.dataValues.img || "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
                        name: creadaR.dataValues.name || 'No Encontrado',
                        temperament: creadaR.dataValues.temperamentos[0].nameT || 'No Encontrado',
                        weight: creadaR.dataValues.weight || 'No Encontrado',
                        height: creadaR.dataValues.height || 'No Encontrado',
                        life_span: creadaR.dataValues.life_span || 'No Encontrado',
                    })
                };
                return res.status(404).json({ message: "No Encontrado" })
            }
        })
        .catch(err => {
            console.error(err)
            return
        });
});

module.exports = router;