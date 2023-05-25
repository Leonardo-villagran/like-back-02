const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Importar callbacks 
const {getPosts, postPost, putPost, deletePosts} = require('./controllers/callbacks');

//Instancia de Express para la creación de las rutas solicitadas
const app = express();
//generar constante que determina el puerto a usar
const PORT = process.env.PORT || 3000;

//Habilitar el middleware de CORS para comunicación entre disntos dominios
app.use(cors());

// Configura body-parser para parsear las solicitudes JSON
app.use(express.json())

// Ruta para obtener todos los posts
app.get('/posts',getPosts);

// Ruta para insertar un nuevo post
app.post('/posts', postPost);

//Ruta para aumentar (actualizar) los likes
app.put('/posts/like/:id', putPost);

//Ruta para borrar post
app.delete('/posts/:id', deletePosts);

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor de Express escuchando en el puerto ${PORT}`);
});