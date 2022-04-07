const { Router } = require('express');

// Importo los modelos de Sequalize 👇
const { Dogs, Breeds, Temperaments } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const temproute = require('./temperaments')
const breedroute = require('./breeds')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(breedroute)
router.use(temproute)

module.exports = router;