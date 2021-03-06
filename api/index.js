//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config()
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT

// Syncing all the models at once.
conn.sync({ force: false })
    .then(() => { // el force: true elimina la tabla si existe y pierde su contenido
    // mientras hago las pruebas de conexión no voy a tener dramas
    server.listen(PORT, () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
});
