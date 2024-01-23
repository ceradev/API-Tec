const HOST = 'http://localhost:3000/api/';
const tbody = document.querySelector('tbody');

async function loadUsers() {
    const response = await fetch(HOST + 'users');
    const json = await response.json();
    const users = json.data.users;
    console.log(users);

    users.forEach(user => {
        loadUser(user);
    });
}

async function loadUser(user) {
    let tr = document.createElement('tr');
    tr.className = 'bg-teal-500 border-b bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600';
    tr.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${user.id}</th>
            <td class="px-6 py-4 text-gray-500 dark:text-white">${user.name}</td>
            <td class="px-6 py-4 text-teal-200 dark:text-white">${user.address}</td>
            <td class="px-6 py-4 text-teal-200 dark:text-white">${user.tel}</td>
            <td class="px-6 py-4 text-teal-200 dark:text-white">${user.email}</td>
            <td class="flex px-6 py-4 text-right"><a href="localhost:3000/" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a></td>
        `;
    tbody.append(tr);
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