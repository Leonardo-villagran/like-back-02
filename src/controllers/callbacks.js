const { Pool } = require('pg');
require('dotenv').config();

// Configura la conexión a la base de datos PostgreSQL a través de variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});

// Callback de tipo GET que permite obtener todos los posts desde la base de datos.

const getPosts = async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM posts order by id');
        const posts = result.rows;
        const fechaHoraActual = new Date();
        console.log("Posts obtenidos desde la base de datos.", fechaHoraActual)
        res.json(posts);

    } catch (err) {
        if (err.errno==-4078){
            res.status(500).json({message: `No hay conexión a la base de datos.`})
        }else{
            res.status(500).json({message: `Error al obtener los posts.`})
        }
    }
}

// Callback de tipo POST que permite insertar un nuevo post a la base de datos

const postPost = async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    //console.log(titulo, img, descripcion);
    const likes = 0;
    try {

        const result = await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING id',
            [titulo, img, descripcion, likes]
        );
        const postId = result.rows[0].id;
        const fechaHoraActual = new Date();
        console.log("Post con id:",postId,"ingresado en la base de datos. ",fechaHoraActual);
        res.json({ id: postId, titulo, img, descripcion, likes });


    } catch (err) {
        if (err.code==23502){
            res.status(400).json({ message: 'Violación de restricción, ningún dato ingresado debe ser nulo.' });
        }
        else{
            res.status(500).json({ message: 'Error al insertar el post' });
        }
    }
}

// Callback de tipo PUT que permite actualizar el estado de los likes dentro de la base de datos. 

const putPost = async (req, res) => {
    const id = req.params.id;
    let likes = 0;
    try {
        const result2 = await pool.query('SELECT likes FROM posts where id=$1', [id]);
        const data = result2.rows[0];
        if (result2.rowCount === 0) {
            throw { code: 404, message: "No existe el id que se quiere editar." };
        }else{
            likes = data.likes + 1;
        }

    } catch ({ code, message }) {
        res.status(code).send(message)
    }

    try {
        const result = await pool.query('UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *', [likes, id]);
        const updatedPost = result.rows[0];
        const fechaHoraActual = new Date();
        console.log("Post con id:",id,"actualizado en la base de datos con",likes,"likes ", fechaHoraActual)
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } 
}

// Callback de tipo DELETE que permite borrar post de la base de datos.

const deletePosts = async (req, res) => {
    const { id } = req.params;
    const fechaHoraActual = new Date();
    let result;
    try {
        result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        
        if (result.rowCount === 0) {
            console.log("Post con id:",id,"no existe de la base de datos.", fechaHoraActual);
            res.status(404).json({message: `No existe el post con ese id`})
        }
        else{
            console.log("Post con id:",id,"eliminado de la base de datos.", fechaHoraActual);
            res.status(200).json({message: 'Post eliminado exitosamente'});
        }

    } catch (error) {
        res.status(500).json({message: `Error al Borrar post.`})
    }
}

// Exportación de los callbacks

module.exports = { getPosts, postPost, putPost, deletePosts };