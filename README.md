# Likeme II

>Tarea 4: Backend de likeme II (PUT-DELETE) para el módulo: Backend con Node y Express (G27)

## Características:

- El sistema corresponde a un programa de tipo backend, que se ejecuta sobre Node js con Express en el puerto 3000, pero se pueden utilizar variables de entorno para cambiar el puerto en la variable `PORT`.

- El sistema permite ejecutar un servidor,  que interactúa con una base de datos de tipo Postgres y proporciona servicios o datos a los clientes que acceden a través de una web de tipo frontend.

- En el servidor se definen rutas y solicitudes `GET`, `POST`, `PUT` y `DELETE` los cuales permiten leer, crear, actualizar y borrar datos de la base de datos a través de llamados proporcionados desde el Frontend. 

- Se agregan los comandos de `try` y `catch`, para maneja posibles errores durante la ejecución de las operaciones.  

- El archivo `index.js` (en la carpeta src) posee las solicitudes a las rutas requeridas:

   ```
   // Ruta para obtener todos los posts
   app.get('/posts',getPosts);

   // Ruta para insertar un nuevo post
   app.post('/posts', postPost);

   //Ruta para aumentar (actualizar) los likes
   app.put('/posts/like/:id', putPost);

   //Ruta para borrar post
   app.delete('/posts/:id', deletePosts);
   ```

- Se genera un archivo llamado .env en el cual se definen variables de entorno para conectar con la base de datos.
  ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=likeme
   ```
- El programa contiene un archivo `index.js` en la carpeta `src`, el cual llama a distintas funciones para mostrar, agregar, actualizar y borrar posts de la base de datos a través de procesos de backend en Node.

- Se utiliza una base de datos llamada `likeme`, que posee una tabla llamada `posts` que almacena los datos de los posts agregados.

- Existe una carpeta llamada `controllers` que almacena las funciones que contienen los `callbacks`.

## Instrucciones de instalación y ejecución:

1. Descarga el repositorio.
2. Abre una terminal en el directorio raíz del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias y módulos necesarios:
   ```
   npm install
   ```
4. Ejecuta el programa en modo de desarrollo, utilizando los comandos:
   ```
   npm run dev
   ```
5. Ejecuta el programa en modo de producción, utilizando los comandos:
   ```
   npm run start
   ```
6. Se puede ejecutar también directamente a través de los comandos:
 ```
   node src/index.js
 ```