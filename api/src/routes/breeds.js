const { Breeds, Temperaments } = require("../db.js");
const {v4: uuidv4} = require('uuid');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;

var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

let idRaza = 300;
router.post("/dogs", async function (req, res) {
// tomo los valores del body y los destruturo
  const { name, heightmin, heightmax, weightmin, weightmax, yearsmin, yearsmax, temper } = req.body;
// creo el objeto de la raza y le agrego el id con el formato uuid
    const objAdd = {
        id: uuidv4(),
        name,
        heightmin,
        heightmax,
        weightmin,
        weightmax,
        yearsmin,
        yearsmax
    }
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newBreed = await Breeds.create(objAdd);
    // seteo el/los temperamentos para sincronizarlos en la tabla relacionada
    await newBreed.setTemperaments(temper);
    // si todo sale bien devuelvo el objeto agregado
    res.send(objAdd)
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    res.status(500).send({"error":error});
  } 
});

router.get("/dogs", async function (req, res) {
  // query: despues del ? y lo uso para buscar una raza por nombre
  var { name } = req.query;
  if (name) {
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
      .then((data) => data.json())
      .then(async (json) => {
        let raza = await Breeds.findAll({
          include: [
            {
              model: Temperaments,
              required: true,
            },
          ],
        });
        
        raza.map((dato) => {
          let tempers = []
          console.log("Buscar agregados en la base de datos")
          if (dato.dataValues.name.includes(name)) {
            dato.dataValues.temperaments.map((temp) => {
              tempers.push(temp.dataValues.name)
              return tempers;
            });
            dato.dataValues.temperament = tempers.join(", ");            
            json.push(dato.dataValues);
          }
        }); 

        console.log("Obtenido juntado a lo de la api en busqueda",json.length)
        if (json.length > 0) {
          let razaEnc = [];

          for (let i = 0; i < json.length; i++) {
            let imagetoshow
            if (json[i].reference_image_id) imagetoshow = `https://cdn2.thedogapi.com/images/${json[i].reference_image_id}.jpg`
            else imagetoshow = "https://aperrados.com/wp-content/uploads/2018/04/razas-perros-destacada.png"

            let raza1 = {
              id: json[i].id,
              name: json[i].name,              
              img: imagetoshow,
              temperament: json[i].temperament || json[i].temperaments,
            };
            razaEnc.push(raza1);
          }
          res.status(200).json(razaEnc);
        }
      });
  } 
  // aqui realizo la busqueda de todos los resultados de razas, sin especificar un nombre
  else {
    fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
      .then((data) => data.json())
      .then(async (json) => {
        let savedBreeds = await Breeds.findAll({
          include: Temperaments,
        });

        // Aqui agrego las razas grabadas al resultado obtenido de la api (json)
         savedBreeds.map((breed) => {
          let tempers = []
          let temperament = breed.dataValues.temperaments.map((temp) => {
            tempers.push(temp.dataValues.name)
            return tempers;
          });
          breed.dataValues.temperament = tempers.join(", ");
          json.push(breed.dataValues);
        }); 

        // aqui retorno el objeto de razas completo
         let raza2 = json.map((dato) => {
          return {
            id: dato.id,
            img:
              (dato.image && dato.image.url) ||
              "https://aperrados.com/wp-content/uploads/2018/04/razas-perros-destacada.png",
            name: dato.name,
            weight: (dato.weight && dato.weight.metric) || dato.weightmin + " - " + dato.weightmax,
            temperament: dato.temperament || dato.temperament,
          };
        }); 

        // raza2.sort((a, b) => (a.name > b.name ? 1 : -1));

        res.status(200).json(raza2);
      });
  }
});

router.get("/dogs/:idRaza", async function (req, res) {
  var { idRaza } = req.params;
  // Reviso si el id es de la api o de la base de datos, como se que el uuid me va a dar string superior a 10 caracteres
  // reviso si el :idRaza es superior a esa longitud e igualo a 10000 (la api no supera 300) 
  let breedtofind
  if (idRaza.length >= 10) {
      breedtofind = idRaza
      idRaza = 10000
  }
  // Consulto a la api si me trae resultados con el valor de idRaza
  fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    .then((data) => data.json())
    .then(async (json) => {
      let raza = json.find((dato) => dato.id === parseInt(idRaza));
      if (raza) {
        return res.json({
          img:
            (raza.image && raza.image.url) ||
            "https://aperrados.com/wp-content/uploads/2018/04/razas-perros-destacada.png",
          name: raza.name || "No Encontrado",
          temperament:
            raza.temperament || raza.temperamentos || "No Encontrado",
          weight: raza.weight.metric || "No Encontrado",
          height: raza.height.metric || "No Encontrado",
          life_span: raza.life_span || "No Encontrado",
        });
      } 
      // si no trae valores desde la api con el idRaza solicitado lo buscaré en la base de datos
      // con el valor breedtofind que será igual a al uuid
      else {
        let razaC = await Breeds.findAll({
          include: [
            {
              model: Temperaments,
              required: true,
            },
          ],
        });

        console.log(razaC)
        console.log(breedtofind)
        let creadaR = razaC.find(
          (dato) => dato.dataValues.id === breedtofind 
        );
        
        if (creadaR) {
          let tempers = []
          creadaR.dataValues.temperaments.map((temp) => {
            tempers.push(temp.dataValues.name)
            return tempers;
          });
          creadaR.dataValues.temperament = tempers.join(", ");
          return res.json({
            img:
              creadaR.dataValues.img ||
              "https://aperrados.com/wp-content/uploads/2018/04/razas-perros-destacada.png",
            name: creadaR.dataValues.name || "No Encontrado", 
             temperament:
              creadaR.dataValues.temperament, // || "No Encontrado", 
            weight: creadaR.dataValues.weightmin + " - " + creadaR.dataValues.weightmax, // || "No Encontrado",
            height: creadaR.dataValues.heightmin + " - " + creadaR.dataValues.heightmax, // || "No Encontrado",
            life_span: creadaR.dataValues.yearsmin + " - " + creadaR.dataValues.yearsmax + " years" // || "No Encontrado", 
          });
        }
        // Si no encuentra en ninguna de las 2 opciones (api o database) devuelve 404 no encontrado
        return res.status(404).json({ message: "No Encontrado" });
      }
    })
    .catch((err) => {
      console.error(err);
      return;
    });
});

module.exports = router;
