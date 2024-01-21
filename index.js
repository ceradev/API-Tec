const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const PARAMETERS =["name", "address", "tel", "email", "perfil_id"];
const PORT = process.env.PORT || 3000;
const USERS = require('./users.json');
<<<<<<< HEAD
const list_users = USERS.length;
=======
>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/list', (req,res)=>{
    res.sendFile(__dirname + '/public/users.html');
})

app.get('/api/users', (req,res)=>{
    const queries = req.query;
    const keys = Object.keys(queries);
<<<<<<< HEAD
    console.log('Query Parameters:', queries);  // Agrega este registro para verificar los parámetros del query
    const error_code = 0;  // No hay error.
=======
    console.log('Query Parameters:', queries);
    const error_code = 0;
>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67
    const error_message="";
    const wrong_keys = [];
    keys.forEach(key=>{
        if (!PARAMETERS.includes(key)) wrong_keys.push(key);
    });

    if (wrong_keys.length) {
        error_message +=  "Los siguientes campos de consulta no son correctos: "+ wrong_keys
    } 
<<<<<<< HEAD
    
=======

>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67
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
<<<<<<< HEAD
    let filtro = CLIENTES.filter(cliente=>cliente.id==id);
    if (filtro.length>0) {
        res.json({
            success: true,
            message: "Cliente enconctrado con id: "+id,
            data: filtro[0]
=======
    let filter = USERS.filter(user=>user.id==id);
    if (filter.length>0) {
        res.json({
            success: true,
            message: "Se ha encontrado el usuario con id : "+id,
            data: filter[0]
>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67
        });
    } else {
        res.status(404).json({
            success: false,
            error_code: 4321,
<<<<<<< HEAD
            message: "No se encuentra ningún cliente con el id: "+id
=======
            message: "No se encuentra ningún usuario con el id: "+id
>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67
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

function esBoolean(b) {
    return (b=="true" || b=="false");
    return false;
}

<<<<<<< HEAD
function esFechaValida(f) {
    let fecha = Date.parse(f);
    return !isNaN(fecha);
}

=======
>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67
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