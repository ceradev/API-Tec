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
                userInfo.innerHTML += `<a href="http://localhost:3000/date/user" class="text-teal-200 hover:text-white">${user.username}</a> | `;
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

async function loadComponents() {

    const response = await fetch('http://localhost:3000/api/components/' + JSON.parse(sessionStorage.getItem('user')).id);

    if (response.ok) {

        const json = await response.json();

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
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="30" height="30">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" fill="white" />
    </svg>
    </div>
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="30" height="30">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" fill="white"/>
    </svg>
    </div>
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="30" height="30">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" fill="white"/>
    </svg>
    </div>
    </td>
    `

    tbody.appendChild(tr);
}


verifySession();

if (window.location.pathname === '/date/user') loadUser();
else if (window.location.pathname === '/date/components') loadComponents();