const HOST = 'http://localhost:3000/api/';
const tbody = document.querySelector('tbody');

async function createUser() {

}

async function loadUser() {
    
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

window.addEventListener("load", () => {

    loadUsers();
});