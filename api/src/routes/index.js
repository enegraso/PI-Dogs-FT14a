const { Router } = require('express');
// Importo los modelos de Sequalize 👇
const { breeds, temperaments } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;