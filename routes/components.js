const express = require('express');
const router = express.Router();

const COMPONENTS = require('../data/components');

// Definir rutas para usuarios
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: "List of components",
        data: COMPONENTS
    });
});

router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    const filter = COMPONENTS.filter(user => user.id == id);
    if (filter.length > 0) {
        res.json({
            success: true,
            message: "Se ha encontrado los componentes del usuario con id : " + id,
            data: filter[0]
        });
    } else {
        res.status(404).json({
            success: false,
            error_code: 4321,
            message: "No se encuentran los componentes del usuario con el id: " + id
        });
    }
});

router.get('/:userId/component/:componentId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const componentId = parseInt(req.params.componentId);

    let componentFound = false;

    COMPONENTS.forEach(user => {
        if (userId === user.id) {
            user.componentes_pc.forEach((component) => {
                if (component.id === componentId) {
                    res.json({
                        success: true,
                        message: "Se ha encontrado el componente con id: " + componentId,
                        data: component
                    });
                    componentFound = true;
                }
            });
        }
    });

    if (!componentFound) {
        res.status(404).json({
            success: false,
            error_code: 4322,
            message: "No se encuentra el componente con el id: " + componentId
        });
    }
});
router.post('/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const newComponent = req.body;

    COMPONENTS.forEach(user => {
        if (userId === user.id) {
            if (user.componentes_pc.length === 0) {
                newComponent.id = 1;
            } else {
                newComponent.id = user.componentes_pc.length + 1;
            }
    
            user.componentes_pc.push(newComponent);
    
            res.json({
                success: true,
                message: "Se ha agregado el componente con el id: " + newComponent.id,
                data: newComponent
            });
        }
    });
});
router.put('/:userId/component/:componentId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const componentId = parseInt(req.params.componentId);

    let oldComponent = false;

    const newComponent = req.body;

    let userFound = false;

    COMPONENTS.forEach(user => {
        if (userId === user.id) {
            userFound = true; // Marcamos que hemos encontrado al usuario

            user.componentes_pc.forEach((component) => {
                if (component.id === componentId) {
                    oldComponent = component;
                    // Actualizamos los campos del componente con los nuevos valores
                    Object.assign(component, newComponent);

                    res.json({
                        success: true,
                        message: "Se ha actualizado el componente con el id: " + componentId,
                        data: oldComponent
                    });
                }
            });
        }
    });

    // Si no se encontró al usuario, devolvemos un error 404
    if (!userFound) {
        res.status(404).json({
            success: false,
            error_code: 4321,
            message: "No se encuentra el usuario con el id: " + userId
        });
    } else if (!oldComponent) {
        // Si el componente no se encontró en el usuario, devolvemos un error 404
        res.status(404).json({
            success: false,
            error_code: 4322,
            message: "No se encuentra el componente con el id: " + componentId
        });
    }
});

router.delete('/:userId/component/:componentId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const componentId = parseInt(req.params.componentId);

    COMPONENTS.forEach(user => {
        if (userId === user.id) {
            user.componentes_pc.forEach((component, index) => {
                if (component.id === componentId) {
                    user.componentes_pc.splice(index, 1);
                    res.json({
                        success: true,
                        message: "Se ha eliminado el componente con el id: " + componentId
                    });
                    return; // Termina la función después de eliminar el componente
                }
            });
        }
    });

    // Si llega aquí, significa que no se encontró el usuario o el componente
    res.status(404).json({
        success: false,
        message: "Usuario o componente no encontrado."
    });
});

function MergeRecursive(obj1, obj2) {
    for (let p in obj2) {
        try {
            // Property in destination object set; update its value.
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

// Exportar el enrutador
module.exports = router;

