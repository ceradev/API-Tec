const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


const PORT = process.env.PORT || 3000;
const CORS = process.env.CORS || '*';

const PARAMETERS_PATH = process.env.PARAMETERS_PATH || 'parameters.json';