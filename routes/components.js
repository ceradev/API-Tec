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

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
});

router.put('/:id', (req, res) => {
});

router.delete('/:id', (req, res) => {
});

// Exportar el enrutador
module.exports = router;