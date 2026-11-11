// SERVIDOR
// Enciende Express, pone los middlewares y monta las rutas.
const express = require('express');
const path = require('path');
const rutas = require('./routes/tiendaRoutes');

const app = express();

app.use(express.json());                               // body en JSON
app.use(express.static(path.join(__dirname, 'public'))); // el front 

app.use('/', rutas);

app.use((req, res) => res.status(404).send('Ruta no encontrada'));

//  levantamos el servidor.
// Vercel toma la app exportada y la ejecuta por su cuenta.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log('Tienda en http://localhost:' + PORT));
}

module.exports = app;
