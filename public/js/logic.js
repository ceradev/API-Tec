const HOST = 'http://localhost:3000/api/';

async function registrateUser(event) {

  event.preventDefault(); // Evita la recarga de la página

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

  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  };
  
  try {
    const response = await fetch(HOST + 'users/', requestOptions);
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

async function aunthenticateUser() {

  const username = document.querySelector('#username').value;

  const password = document.querySelector('#password').value;

  try {
    const response = await fetch(HOST + 'users');
    const json = await response.json();

    json.forEach(user => {

        if (user.username == username && user.password == password) {
          
            sessionStorage.setItem('user', JSON.stringify(user));
            
            // Redirige a la página de inicio de sesión
            window.location.href = 'http://localhost:3000';
        }
    });

    // Verifica si el inicio de sesión fue exitoso antes de redirigir
  } catch (error) {
    console.error("Error al realizar el inicio de sesion:", error); 
  }
  
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