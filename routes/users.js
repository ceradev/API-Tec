const express = require('express');
const router = express.Router();

const USERS = require('../data/users');

// Definir rutas para usuarios
router.get('/', (req, res) => {
    // Tu lógica para obtener todos los usuarios
    const queries = req.query;
    const keys = Object.keys(queries);
    console.log('Query Parameters:', queries);  // Agrega este registro para verificar los parámetros del query
    const error_code = 0;  // No hay error.
    console.log('Query Parameters:', queries);    const error_message="";
    const wrong_keys = [];
    keys.forEach(key=>{
        if (!PARAMETERS.includes(key)) wrong_keys.push(key);
    });

    if (wrong_keys.length) {
        error_message +=  "Los siguientes campos de consulta no son correctos: "+ wrong_keys
    } 
    
    if (error_message) {
        error_code=400
        res.status(400).json({
            success: false,
            error_code: error_code,
            message: error_message
        });
    } else {
        const filter_users = USERS.filter(user=>{

            if (queries.name && user.name) {
                if (!user.name.toLowerCase().includes(queries.name.toLowerCase())) return false;
            }
            if (user.address) {
                if (queries.address && user.address) {
                    if (user.address.toLowerCase()!=queries.address.toLowerCase()) return false;
                }
            }
            if (user.tel) {
                if (queries.tel && user.tel) {
                    if (user.tel.toLowerCase()!=queries.tel.toLowerCase()) return false;
                }
            }
            if (user.email) {
                if (queries.email && user.email) {
                    if (user.email.toLowerCase()!=queries.email.toLowerCase()) return false;
                }
            }
            if (user.perfil_id) {
                if (queries.perfil_id && user.perfil_id) {
                    if (user.perfil_id!=queries.perfil_id) return false;
                }
            }
            return true;
        });
        const user_properties = filter_users.map(user=>{
            return {
                id: user.id,
                name: user.name,
                address: user.address,
                tel: user.tel,
                email: user.email,
                perfil_id: user.perfil_id
            }
        })
        res.json({
            success: true,
            message: "List of users",
            data: {
                count: user_properties.length,
                users: user_properties
            }
        }); 
    }       
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const filter = USERS.filter(user=>user.id==id);
    if (filter.length>0) {
        res.json({
            success: true,
            message: "Se ha encontrado al usuario con id : "+ id,
            data: filter[0]
        });
    } else {
        res.status(404).json({
            success: false,
            error_code: 4321,
            message: "No se encuentran el usuario con el id: "+ id
        });
    }
});

router.post('/', (req, res) => {
    let newUser = req.body;
    // Compruebo si están los datos obligatorios
    if (newUser.nombre && newUser.apellidos && newUser.email && newUser.password && newUser.tel) {
        nuevoCliente.id=++idNuevo;
        CLIENTES.push(nuevoCliente);
        res.status(201).json({
            success: true,
            message: "Usuario registrado con éxito",
            data: newUser
        });
    } else {
        res.status(422).json({
            success: false,
            error_code: 5555,
            message: "Los datos obligatorios son: nombre, apellidos, email, password, tel",
            data: newUser
        });
    }
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let filtro = CLIENTES.filter(cliente=>cliente.id==id);
    if (filtro.length==0) {
        res.status(404).json({
            success: false,
            error_code: 4322,
            message: "No se encuentra el cliente que se quiere modificar con el id: "+id
        });
    } else {
        let nuevosDatos = req.body;
        let viejosDatos = filtro[0];
        MergeRecursive(viejosDatos,nuevosDatos);
        res.json({
            success: true,
            message: "Cliente modificado con éxito",
            data: viejosDatos
        });
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let indice = CLIENTES.findIndex((cliente)=>cliente.id==id);
    console.log(indice);
    if (indice<0) {
        res.status(404).json({
            success: false,
            error_code: 4323,
            message: "No se encuentra el cliente que se quiere borrar con el id: "+id
        });  
    } else {
        let clienteEliminado=CLIENTES.splice(indice,1);
        res.json({
            success: true,
            message: "Cliente eliminado con éxito",
            data: clienteEliminado
        });
    }
});

// Exportar el enrutador
module.exports = router;