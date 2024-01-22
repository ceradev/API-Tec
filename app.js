const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const path = require('path');

const PARAMETERS =["name", "address", "tel", "email", "perfil_id"];
const PORT = process.env.PORT || 3000;
const USERS = require('./users.json');
const COMPONENTS = require('./components.json');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

// Establecer el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Archivo estático para los estilos
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/list', (req,res)=>{
    res.render('users');
})

app.get('/components', (req,res)=>{
    res.render('components');
})

app.get('/api/users', (req,res)=>{
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

app.get('/api/users/:id', (req,res)=>{
    let id = req.params.id;
    const filter = COMPONENTS.filter(user=>user.id==id);
    if (filter.length>0) {
        res.json({
            success: true,
            message: "Se ha encontrado los componentes del usuario con id : "+ id,
            data: filter[0]
        });
    } else {
        res.status(404).json({
            success: false,
            error_code: 4321,
            message: "No se encuentran componentes del usuario con el id: "+ id
        });
    }
});

app.post('/api/users', (req,res)=>{
    let nuevoCliente = req.body;
    // Compruebo si están los datos obligatorios
    if (nuevoCliente.nombre && nuevoCliente.apellidos && nuevoCliente.direccion.localidad) {
        nuevoCliente.id=++idNuevo;
        CLIENTES.push(nuevoCliente);
        res.status(201).json({
            success: true,
            message: "Cliente creado con éxito",
            data: nuevoCliente
        });
    } else {
        res.status(422).json({
            success: false,
            error_code: 5555,
            message: "Falta algún dato.",
            data: nuevoCliente
        });
    }
});

app.put('/api/users/:id',(req,res)=>{
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

app.delete('/api/users/:id',(req,res)=>{
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
     
app.listen(PORT, ()=>{
    console.log("El servidor está escuchando en el puerto "+PORT);
});

function MergeRecursive(obj1, obj2) {
    for (let p in obj2) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor==Object ) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  }