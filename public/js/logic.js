async function registrateUser(event) {

    event.preventDefault(); // Evita la recarga de la página


    let requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loadDate())
    };

    try {
        const response = await fetch("http://localhost:3000/api/users/", requestOptions);
        const json = await response.json();

        // Verifica si el registro fue exitoso antes de redirigir
        if (json.success) {
            // Redirige a la página de inicio de sesión
            window.location.href = 'http://localhost:3000/auth/' + 'login';
        } else {
            // Muestra un mensaje de error si el registro no fue exitoso
            console.error(json.message);
        }
    } catch (error) {
        console.error("Error al realizar el registro:", error);
    }
}

async function loadDate() {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const address = document.querySelector('#address').value;
    const tel = document.querySelector('#phone').value;

    const user = {
        "username": username,
        "email": email,
        "password": password,
        "address": address,
        "tel": tel
    }

    return user;
}

async function authenticateUser(event) {

    event.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        const response = await fetch("http://localhost:3000/api/users");
        const json = await response.json();

        // Busca el usuario en el array
        const authenticatedUser = json.data.users.find(user => user.username === username && user.password === password);

        if (authenticatedUser) {
            sessionStorage.setItem('user', JSON.stringify(authenticatedUser));
            // Redirige a la página principal
            window.location.href = 'http://localhost:3000';
        } else {
            console.error("Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error al realizar el inicio de sesión:", error);
    }
}

async function verifySession() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    try {
        if (user) {
            // Muestra el nombre del usuario en algún elemento HTML
            const userInfo = document.getElementById('userInfo'); // Cambia 'usernameElement' por el ID real de tu elemento
            const userComponents = document.getElementById('yourComponentsButton');
            if (userInfo) {
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
async function loadUser() {

    authenticatedUser = null;

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        document.getElementById('inputUsername').textContent = user.username;
        document.getElementById('inputAddress').textContent = user.address;
        document.getElementById('inputTel').textContent = user.tel;
        document.getElementById('inputEmail').textContent = user.email;
    }
}

function hideButtons() {
    const loginButton = document.getElementById('loginButton'); // Cambia 'loginButton' por el ID real de tu botón de login
    const registerButton = document.getElementById('registerButton'); // Cambia 'registerButton' por el ID real de tu botón de register

    if (loginButton && registerButton) {
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
    }
}

async function logoutUser() {
    sessionStorage.removeItem('user');
    location.reload();
}

async function modifyUser() {

}

async function createComponent() {

}

async function modifyComponent() {

}

async function deleteComponent() {

}

async function viewComponent() {

    
}

async function loadComponents() {

    const response = await fetch('http://localhost:3000/api/components/' + JSON.parse(sessionStorage.getItem('user')).id);
    
    if (response.ok) {

        const json = await response.json();

        console.log(json);

        json.data.componentes_pc.forEach(component => {
            loadComponent(component);
        });
    } else {
        alert("Server error, please try again later.");
    }
}
async function loadComponent(component) {

    const tbody = document.querySelector('tbody');

    const tr = document.createElement('tr');

    tr.innerHTML = `

    <td class = "text-white px-6 py-3 text-center">${component.id}</td>
    <td class = "text-white px-6 py-3 text-left">${component.nombre}</td>
    <td class = "text-white px-6 py-3 text-center">${component.cantidad}</td>
    <td class = "text-white px-6 py-3 text-center" >${component.precio}</td>
    <td class="flex space-x-4">
    <div>
    <a href="http://localhost:3000/information/component" style="cursor:pointer;">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" width="30" height="30">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" fill="teal"/>
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="teal" />
  </svg>
</a>
    </div>
    <div>
    <a href="http://localhost:3000" style="cursor:pointer;">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" width="30" height="30">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" fill="teal"/>
    </svg>
    </a>
    </div>
    </td>
    `

    tbody.appendChild(tr);
}


verifySession();

if (window.location.pathname === '/information/user') loadUser();
else if (window.location.pathname === '/information/components') loadComponents();