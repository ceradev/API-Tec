const express = require('express');
const router = express.Router();

// Requiere Knex con la configuración de MySQL
const db = require('../knexfile');

// Definir los parámetros permitidos para la búsqueda
const PARAMETERS = ['username', 'address', 'tel', 'email', 'password', 'perfil_id'];

// Ruta para obtener todos los usuarios o filtrar según parámetros de consulta
router.get('/', async (req, res) => {
    const queries = req.query;
    const keys = Object.keys(queries);
    let error_code = 0;  // No hay error.
    let error_message = "";
    const wrong_keys = [];

    // Verificar que los parámetros de consulta sean válidos
    keys.forEach(key => {
        if (!PARAMETERS.includes(key)) wrong_keys.push(key);
    });

    if (wrong_keys.length) {
        error_message += "Los siguientes campos de consulta no son correctos: " + wrong_keys
    }

    if (error_message) {
        error_code = 400
        return res.status(400).json({
            success: false,
            error_code: error_code,
            message: error_message
        });
    }

    try {
        // Utilizar Knex para realizar consultas a la base de datos MySQL
        const filter_users = await db.select('*').from('users').where(builder => {
            keys.forEach(key => {
                builder.orWhere(key, 'like', `%${queries[key]}%`);
            });
        });

        // Mapear propiedades de usuarios para respuesta
        const user_properties = filter_users.map(user => {
            return {
                id: user.id,
                username: user.username,
                address: user.address,
                tel: user.tel,
                email: user.email,
                password: user.password,
                perfil_id: user.perfil_id
            };
        });

        // Enviar respuesta exitosa con la lista de usuarios
        return res.status(200).json({
            success: true,
            message: "Lista de usuarios",
            data: {
                count: user_properties.length,
                users: user_properties
            }
        });
    } catch (error) {
        // Loguear el error detallado
        console.error(error);

        if (error.code === 'ER_NO_SUCH_TABLE') {
            // Manejar el error de "Tabla no encontrada"
            return res.status(500).json({
                success: false,
                error_code: 500,
                message: "La tabla 'users' no existe"
            });
        }

        return res.status(500).json({
            success: false,
            error_code: 500,
            message: "Error en la base de datos"
        });
    }
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Utilizar Knex para obtener un usuario por ID
        const user = await db('users').where({ id }).first();

        if (user) {
            // Enviar respuesta exitosa con el usuario encontrado
            return res.json({
                success: true,
                message: "Usuario encontrado con id: " + id,
                data: user
            });
        } else {
            // Enviar respuesta de error si no se encuentra el usuario
            return sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, "No se encuentra el usuario con id: " + id);
        }
    } catch (error) {
        // Manejar errores de la base de datos
        console.error(error);
        return res.status(500).json({
            success: false,
            error_code: 500,
            message: "Error en la base de datos"
        });
    }
});

// Ruta para registrar un nuevo usuario
router.post('/', async (req, res) => {
    let newUser = req.body;

    // Comprobar si se proporcionan los datos obligatorios
    if (newUser.username && newUser.address && newUser.email && newUser.password && newUser.tel) {
        try {
            // Insertar el nuevo usuario en la base de datos
            const [insertedUserId] = await db('users').insert(newUser);

            // Obtener el usuario recién insertado
            const insertedUser = await db('users').where({ id: insertedUserId }).first();

            // Enviar respuesta exitosa con el nuevo usuario
            return res.status(201).json({
                success: true,
                message: "Usuario registrado con éxito",
                data: insertedUser
            });
        } catch (error) {
            // Manejar errores de la base de datos
            console.error(error);
            return res.status(500).json({
                success: false,
                error_code: 500,
                message: "Error en la base de datos al registrar un nuevo usuario"
            });
        }
    } else {
        // Enviar respuesta de error si faltan datos obligatorios
        return res.status(422).json({
            success: false,
            error_code: 5555,
            message: "Los datos obligatorios son: nombre, apellidos, email, password, tel",
            data: newUser
        });
    }
});

// Ruta para modificar un usuario por ID
router.put('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        // Utilizar Knex para obtener y actualizar un usuario por ID
        const userToUpdate = await db('users').where({ id }).first();

        if (userToUpdate) {
            let nuevosDatos = req.body;

            // Actualizar el usuario en la base de datos
            await db('users').where({ id }).update(nuevosDatos);

            // Obtener el usuario actualizado
            const updatedUser = await db('users').where({ id }).first();

            // Enviar respuesta exitosa con los datos modificados
            return res.json({
                success: true,
                message: "Usuario con id: " + id + " modificado con éxito",
                data: updatedUser
            });
        } else {
            // Enviar respuesta de error si no se encuentra el usuario a modificar
            return sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, "No se encuentra el usuario que se quiere modificar con id: " + id);
        }
    } catch (error) {
        // Manejar errores de la base de datos
        console.error(error);
        return res.status(500).json({
            success: false,
            error_code: 500,
            message: "Error en la base de datos al modificar un usuario"
        });
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        // Utilizar Knex para eliminar un usuario por ID
        const userToDelete = await db('users').where({
            id
        }).first();

        if (userToDelete) {
            // Eliminar el usuario de la base de datos
            await db('users').where({
                id
            }).del();

            // Enviar respuesta exitosa con el usuario eliminado
            return res.json({
                success: true,
                message: "Usuario eliminado con éxito",
                data: userToDelete
            });
        } else {
            // Enviar respuesta de error si no se encuentra el usuario a eliminar
            return sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, "No se encuentra el usuario que se quiere borrar con id: " + id);
        }
    } catch (error) {
        // Manejar errores de la base de datos
        console.error(error);
        return res.status(500).json({
            success: false,
            error_code: 500,
            message: "Error en la base de datos al eliminar un usuario"
        });
    }
});

// Exportar el enrutador
module.exports = router;