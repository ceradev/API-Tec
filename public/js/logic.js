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

    if (user) {
        // Muestra el nombre del usuario en algún elemento HTML
        const userInfo = document.getElementById('userInfo'); // Cambia 'usernameElement' por el ID real de tu elemento
        if (userInfo) {
            userInfo.innerHTML += `<a href="http://localhost:3000/date/user" class="text-teal-200 hover:text-white">${user.username}</a> | `;
            userInfo.innerHTML += `<a href="http://localhost:3000" onclick="logoutUser()" class="text-teal-200 hover:text-white">Logout</a>`;
            userInfo.style.display = 'inline';

            hideButtons();
        } else {
            console.error("Elemento no encontrado");
        }
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

    const response = await fetch(HOST + 'users/:');
    const json = await response.json();
    const users = json.data.users;
}

async function loadComponent() {

}


verifySession();

console.log(window.location.href);

if (window.location.pathname === '/date/user') {
    loadUser();
}