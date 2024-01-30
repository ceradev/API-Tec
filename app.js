const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const knex = require('knex'); 
const knexConfig = require('./knexfile');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

// Conectar a la base de datos
const db = knex(knexConfig.development);

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/information', require('./routes/information'));
app.use('/api/users', require('./routes/users')(db));
app.use('/api/components', require('./routes/components'));

// Error handling middleware should be at the end of your middleware array!
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    next();
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${PORT}`);
});