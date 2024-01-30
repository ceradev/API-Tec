const express = require('express');
const router = express.Router();

// Requiere Knex con la configuración de SQLite3
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

// Cambia las referencias a la variable USERS con consultas a la base de datos
const ERROR_USER_NOT_FOUND = 4321;

// Función para manejar errores 404
function sendNotFoundResponse(res, errorCode, message) {
    res.status(404).json({
        success: false,
        error_code: errorCode,
        message: message
    });
}

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
        // Utilizar Knex para realizar consultas a la base de datos
        const filter_users = await knex('users').where(builder => {
            keys.forEach(key => {
                builder.orWhere(key, 'ilike', `%${queries[key]}%`);
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
        // Manejar errores de la base de datos
        console.error(error);
        return res.status(500).json({
            success: false,
            error_code: 500,
            message: "Error en la base de datos"
        });
    }
});

// Ruta para obtener un usuario por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const filter = USERS.filter(user => user.id == id);

    if (filter.length > 0) {
        // Enviar respuesta exitosa con el usuario encontrado
        return res.json({
            success: true,
            message: "Usuario encontrado con id: " + id,
            data: filter[0]
        });
    } else {
        // Enviar respuesta de error si no se encuentra el usuario
        return sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, "No se encuentra el usuario con id: " + id);
    }
});

// Ruta para registrar un nuevo usuario
router.post('/', (req, res) => {
    let newUser = req.body;

    // Comprobar si se proporcionan los datos obligatorios
    if (newUser.username && newUser.address && newUser.email && newUser.password && newUser.tel) {
        newUser.id = USERS.length + 1;
        newUser.perfil_id = USERS.length + 1;
        USERS.push(newUser);

        // Crear un registro de componente asociado con el usuario
        const newComponent = {
            id: COMPONENTS.length + 1,
            nombre_usuario: newUser.username,
            componentes_pc: []
        };

        COMPONENTS.push(newComponent);

        // Enviar respuesta exitosa con el nuevo usuario
        return res.status(201).json({
            success: true,
            message: "Usuario registrado con éxito",
            data: newUser
        });
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
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let filtro = USERS.filter(user => user.id == id);

    if (filtro.length == 0) {
        // Enviar respuesta de error si no se encuentra el usuario a modificar
        return sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, "No se encuentra el usuario que se quiere modificar con id: " + id);
    } else {
        let nuevosDatos = req.body;
        let viejosDatos = filtro[0];

        // Fusionar datos antiguos y nuevos
        MergeRecursive(viejosDatos, nuevosDatos);

        // Enviar respuesta exitosa con los datos modificados
        return res.json({
            success: true,
            message: "Usuario con id: " + id + " modificado con éxito",
            data: viejosDatos
        });
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let indice = USERS.findIndex((user) => user.id == id);

    if (indice < 0) {
        // Enviar respuesta de error si no se encuentra el usuario a eliminar
        return sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, "No se encuentra el usuario que se quiere borrar con id: " + id);
    } else {
        let userEliminado = USERS.splice(indice, 1);

        // Enviar respuesta exitosa con el usuario eliminado
        return res.json({
            success: true,
            message: "Usuario eliminado con éxito",
            data: userEliminado
        });
    }
});

// Exportar el enrutador
module.exports = router;