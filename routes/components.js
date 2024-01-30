const express = require('express');
const router = express.Router();

const COMPONENTS = require('../data/components');

// Constantes para códigos de error
const ERROR_USER_NOT_FOUND = 4321;
const ERROR_COMPONENT_NOT_FOUND = 4322;

// Función para manejar errores 404
function sendNotFoundResponse(res, errorCode, message) {
    res.status(404).json({
        success: false,
        error_code: errorCode,
        message: message
    });
}

// Ruta para obtener la lista de componentes
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: "List of components",
        data: COMPONENTS
    });
});

// Ruta para obtener componentes de un usuario por ID
router.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    
    const user = COMPONENTS.find(user => user.id === userId);

    if (user) {
        res.json({
            success: true,
            message: `Components found for user with ID ${userId}`,
            data: user
        });
    } else {
        sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, `No components found for user with ID ${userId}`);
    }
});

// Ruta para obtener detalles de un componente por ID de usuario y componente
router.get('/:userId/component/:componentId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const componentId = parseInt(req.params.componentId);

    const user = COMPONENTS.find(user => user.id === userId);

    if (user) {
        const component = user.componentes_pc.find(component => component.id === componentId);

        if (component) {
            res.json({
                success: true,
                message: `Component found with ID ${componentId}`,
                data: component
            });
        } else {
            sendNotFoundResponse(res, ERROR_COMPONENT_NOT_FOUND, `No component found with ID ${componentId}`);
        }
    } else {
        sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, `No user found with ID ${userId}`);
    }
});

// Ruta para agregar un nuevo componente a un usuario por ID
router.post('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const newComponent = req.body;

    // Verificar campos obligatorios
    if (!newComponent.nombre || !newComponent.cantidad || !newComponent.descripcion || !newComponent.precio) {
        res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
        return;
    }

    // Encontrar al usuario
    const user = COMPONENTS.find(user => user.id === userId);

    if (user) {
        // Generar un nuevo ID para el componente
        newComponent.id = user.componentes_pc.length + 1;

        // Agregar el nuevo componente a la lista del usuario
        user.componentes_pc.push(newComponent);

        res.json({
            success: true,
            message: `Component added with ID ${newComponent.id}`,
            data: newComponent
        });
    } else {
        sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, `No user found with ID ${userId}`);
    }
});

// Ruta para actualizar un componente por ID de usuario y componente
router.put('/:userId/component/:componentId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const componentId = parseInt(req.params.componentId);
    const newComponent = req.body;

    // Verificar campos obligatorios
    if (!newComponent.nombre || !newComponent.cantidad || !newComponent.descripcion || !newComponent.precio) {
        res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
        return;
    }

    // Encontrar al usuario
    const user = COMPONENTS.find(user => user.id === userId);

    if (user) {
        // Encontrar el componente
        const componentIndex = user.componentes_pc.findIndex(component => component.id === componentId);

        if (componentIndex !== -1) {
            // Almacenar el componente antiguo antes de actualizarlo
            const oldComponent = { ...user.componentes_pc[componentIndex] };

            // Actualizar el componente con los nuevos valores
            user.componentes_pc[componentIndex] = { ...oldComponent, ...newComponent };

            res.json({
                success: true,
                message: `Component updated with ID ${componentId}`,
                data: oldComponent
            });
        } else {
            sendNotFoundResponse(res, ERROR_COMPONENT_NOT_FOUND, `No component found with ID ${componentId}`);
        }
    } else {
        sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, `No user found with ID ${userId}`);
    }
});

// Ruta para eliminar un componente por ID de usuario y componente
router.delete('/:userId/component/:componentId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const componentId = parseInt(req.params.componentId);

    // Encontrar al usuario
    const userIndex = COMPONENTS.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        const user = COMPONENTS[userIndex];

        // Encontrar el componente
        const componentIndex = user.componentes_pc.findIndex(component => component.id === componentId);

        if (componentIndex !== -1) {
            // Eliminar el componente de la lista del usuario
            const deletedComponent = user.componentes_pc.splice(componentIndex, 1)[0];

            res.json({
                success: true,
                message: `Component deleted with ID ${componentId}`,
                data: deletedComponent
            });
        } else {
            sendNotFoundResponse(res, ERROR_COMPONENT_NOT_FOUND, `No component found with ID ${componentId}`);
        }
    } else {
        sendNotFoundResponse(res, ERROR_USER_NOT_FOUND, `No user found with ID ${userId}`);
    }
});

// Exportar el enrutador
module.exports = router;