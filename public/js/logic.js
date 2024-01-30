// Función auxiliar para hacer una solicitud a la API
async function makeApiRequest(url, options) {
    try {

        const response = await fetch(url, options);

        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            throw new Error(`Error en la solicitud a ${url}: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error en la solicitud a ${url}: ${error.message}`);
    }
}

// Función auxiliar para manejar la respuesta exitosa de la API
function handleApiResponseSuccess(json, successMessage, successCallback) {
    if (json.success) {
        showMessage(successMessage, true, successCallback);
    } else {
        showMessage(`Error: ${json.message}`, false);
        console.error(json.message);
    }
}

// Función auxiliar para manejar errores en las solicitudes a la API
function handleApiRequestError(errorMessage) {
    showMessage(errorMessage, false);
    console.error(errorMessage);
}

// Función para ocultar botones de registro y login al iniciar sesión
function hideButtons() {
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    if (loginButton && registerButton) {
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
    }
}

// Función para mostrar un mensaje con callback
function showMessage(message, isSuccess = true, callback) {
    const messageContainer = document.querySelector('.message-container');
    const messageText = document.querySelector('.message-text');

    // Aplicar clases de estilo dependiendo del tipo de mensaje (éxito o error)
    messageContainer.className = isSuccess ? 'message-container success-message' : 'message-container error-message';

    messageText.textContent = message;

    // Mostrar el elemento
    messageContainer.style.display = 'block';

    // Ocultar automáticamente después de 5 segundos (ajusta según tus necesidades)
    setTimeout(() => {
        messageContainer.style.display = 'none';
        messageText.textContent = '';

        // Ejecutar la función de retorno de llamada después de ocultar el mensaje
        if (callback) {
            callback();
        }
    }, 2000);
}

// Función para registrar un usuario
async function registrateUser(event) {
    event.preventDefault(); // Evita la recarga de la página

    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loadDataUser())
        };

        const response = await makeApiRequest("http://localhost:3000/api/users/", requestOptions);

        // Redirige a la página de inicio de sesión
        handleApiResponseSuccess(response, "¡Usuario registrado con éxito! Ahora puedes iniciar sesión.", () => {
            window.location.href = 'http://localhost:3000/auth/login';
        });
    } catch (error) {
        handleApiRequestError("Error al registrar usuario. Por favor, intenta nuevamente más tarde.");
        console.error("Error al realizar el registro:", error);
    }
}

// Función para cargar los datos del usuario
function loadDataUser() {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const address = document.querySelector('#address').value;
    const tel = document.querySelector('#phone').value;

    return {
        "username": username,
        "email": email,
        "password": password,
        "address": address,
        "tel": tel
    };
}

// Función para autenticar al usuario
async function authenticateUser(event) {
    event.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        const json = await makeApiRequest("http://localhost:3000/api/users");

        const authenticatedUser = json.data.users.find(user => user.username === username && user.password === password);

        if (authenticatedUser) {
            sessionStorage.setItem('user', JSON.stringify(authenticatedUser));
            // Redirige a la página principal
            handleApiResponseSuccess(json, `¡Inicio de sesión exitoso! Bienvenido de nuevo a tu cuenta ${authenticatedUser.username}`, () => {
                window.location.href = 'http://localhost:3000';
            });
        } else {
            showMessage("Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.", false);
        }
    } catch (error) {
        handleApiRequestError("Error al realizar el inicio de sesión. Por favor, intenta nuevamente más tarde.");
    }
}

// Función para verificar la sesión del usuario
async function verifySession() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    try {
        if (user) {
            // Muestra el nombre del usuario en algún elemento HTML
            const userInfo = document.getElementById('userInfo');
            const userComponents = document.getElementById('yourComponentsButton');

            if (userInfo) {
                if (window.location.pathname === '/information/components') {
                    document.getElementById('addComponentButton').style.display = 'hidden';
                }
                userInfo.innerHTML += `<a href="http://localhost:3000/information/user" class="text-teal-200 hover:text-white">${user.username}</a> | `;
                userInfo.innerHTML += `<a href="http://localhost:3000" onclick="logoutUser()" class="text-teal-200 hover:text-white">Logout</a>`;
                userInfo.style.display = 'inline';
                userComponents.style.display = 'block';
                hideButtons();
            }
        }
    } catch (error) {
        console.error("Error al verificar la sesión:", error);
    }
}

// Función para cargar información del usuario
async function loadUser(event) {
    event.preventDefault();

    authenticatedUser = null;

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        document.getElementById('inputUsername').textContent = user.username;
        document.getElementById('inputAddress').textContent = user.address;
        document.getElementById('inputTel').textContent = user.tel;
        document.getElementById('inputEmail').textContent = user.email;
    }
}

// Función para modificar información del usuario
async function modifyUser() {
    // Implementar según sea necesario
}

// Función para cerrar sesión del usuario
async function logoutUser() {
    try {
        sessionStorage.removeItem('user');
        showMessage("¡Sesión cerrada con éxito! Redirigiendo a la página de inicio.", true, () => {
            window.location.href = 'http://localhost:3000';
        });
    } catch (error) {
        handleApiRequestError("Error al cerrar sesión. Por favor, intenta nuevamente más tarde.");
    }
}

// Función para cargar los componentes del usuario
async function loadComponents(event) {
    event.preventDefault();

    if (sessionStorage.getItem('selectedComponent') != null) {
        sessionStorage.removeItem('selectedComponent');
    }

    try {
        const json = await makeApiRequest(`http://localhost:3000/api/components/user/${JSON.parse(sessionStorage.getItem('user')).id}`);

        json.data.componentes_pc.forEach(component => {
            loadComponent(component);
        });
    } catch (error) {
        handleApiRequestError("Error al cargar los componentes del usuario. Por favor, intenta nuevamente más tarde.");
    }
}

// Función para cargar un componente en la tabla
async function loadComponent(component) {
    const tbody = document.querySelector('tbody');
    const tr = document.createElement('tr');

    tr.innerHTML = `
    <td class="text-white px-6 py-3 text-center">${component.id}</td>
    <td class="text-white px-6 py-3 text-left">${component.nombre}</td>
    <td class="text-white px-6 py-3 text-center">${component.cantidad}</td>
    <td class="text-white px-6 py-3 text-center">${component.precio}</td>
    <td class="flex space-x-4">
        <div>
            <a onclick="viewDetails(${component.id})" style="cursor:pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" width="30" height="30">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" fill="teal"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="teal" />
                </svg>
            </a>
        </div>
        <div>
            <a style="cursor:pointer;" onclick="deleteComponent(${component.id})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" width="30" height="30">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" fill="teal"/>
                </svg>
            </a>
        </div>
    </td>
    `;

    tbody.appendChild(tr);
}

// Función para crear un nuevo componente
async function addComponent(event) {

    event.preventDefault(); // Evita la recarga de la página

    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loadDataComponent())
        };

        const response = await makeApiRequest("http://localhost:3000/api/components/" + JSON.parse(sessionStorage.getItem('user')).id, requestOptions);

        handleApiResponseSuccess(response, "¡Componente creado con éxito! Puedes verlo en tu lista de componentes.", () => {
            window.location.href = 'http://localhost:3000/information/components';
        });
    } catch (error) {
        handleApiRequestError("Error al crear componente. Por favor, intenta nuevamente más tarde.");
    }
}

function loadDataComponent() {
    const nombre = document.getElementById('name').value;
    const cantidad = document.getElementById('quantity').value;
    const precio = document.getElementById('price').value;
    const descripcion = document.getElementById('description').value;

    return {
        "nombre": nombre,
        "cantidad": cantidad,
        "precio": precio,
        "descripcion": descripcion,
    };
}

// Función para modificar un componente
async function modifyComponent() {
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    const component = {
        "nombre": name,
        "cantidad": quantity,
        "precio": price,
        "descripcion": description
    }

    try {
        const response = await makeApiRequest('http://localhost:3000/api/components/' + JSON.parse(sessionStorage.getItem('user')).id + '/component/' + JSON.parse(sessionStorage.getItem('selectedComponent')).data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(component)
        });

        handleApiResponseSuccess(response, "¡Componente modificado con éxito!", () => {
            window.location.href = 'http://localhost:3000/information/components';
        });
    } catch (error) {
        handleApiRequestError("Error al modificar componente. Por favor, intenta nuevamente más tarde.");
        console.error("Error al realizar la modificación del componente:", error);
    }
}

// Función para eliminar un componente
async function deleteComponent(id) {
    try {
        if (!confirm("¿Estás seguro de que deseas eliminar este componente?")) {
            return;
        }

        const response = await makeApiRequest('http://localhost:3000/api/components/' + JSON.parse(sessionStorage.getItem('user')).id + '/component/' + id, {
            method: 'DELETE'
        });

        handleApiResponseSuccess(response, "¡Componente eliminado con éxito!", () => {
            window.location.href = 'http://localhost:3000/information/components';
        });
    } catch (error) {
        handleApiRequestError("Error al eliminar componente. Por favor, intenta nuevamente más tarde.");
        console.error(error);
    }
}

// Función para ver detalles de un componente
async function viewComponent(event) {
    event.preventDefault();

    const component = JSON.parse(sessionStorage.getItem('selectedComponent'));

    const name = document.createElement('input');
    name.setAttribute('type', 'text');
    name.value = component.data.nombre;
    name.id = "name";
    name.className = "appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500";

    document.getElementById('inputName').append(name);

    const quantity = document.createElement('input');
    quantity.setAttribute('type', 'number');
    quantity.value = component.data.cantidad;
    quantity.id = "quantity";
    quantity.className = "appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500";

    document.getElementById('inputQuantity').append(quantity);

    const description = document.createElement('textarea');
    description.value = component.data.descripcion;
    description.id = "description";
    description.className = "appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500";

    document.getElementById('inputDescription').append(description);

    const price = document.createElement('input');
    price.setAttribute('type', 'number');
    price.value = component.data.precio;
    price.id = "price";
    price.className = "appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500";

    document.getElementById('inputPrice').append(price);
}

// Función para ver detalles de un componente y redirigir a la página correspondiente
async function viewDetails(componentId) {
    try {
        const response = await makeApiRequest('http://localhost:3000/api/components/' + JSON.parse(sessionStorage.getItem('user')).id + '/component/' + componentId);

        handleApiResponseSuccess(response, "Componente obtenido con éxito", () => {
            const component = response;
            sessionStorage.setItem('selectedComponent', JSON.stringify(component));
            window.location.href = 'http://localhost:3000/information/component';
        });
    } catch (error) {
        handleApiRequestError("Error al obtener detalles del componente. Por favor, intenta nuevamente más tarde.");
        console.error(error);
    }
}

// Listener de carga inicial de la página
window.addEventListener('load', (event) => {
    verifySession();
    if (window.location.pathname === '/information/user') loadUser(event);
    else if (window.location.pathname === '/information/components') {
        loadComponents(event);
        document.getElementById('addComponentButton').style.display = 'block';
    }
    else if (window.location.pathname === '/information/component') viewComponent(event);
});
