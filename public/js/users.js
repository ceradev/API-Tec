const HOST = 'http://localhost:3000/api/';
const tbody = document.querySelector('tbody');

async function loadUsers() {
    const response = await fetch(HOST + 'users');
    const json = await response.json();
    const users = json.data.users;
    console.log(users);

    users.forEach(user => {
<<<<<<< HEAD
        let tr = document.createElement('tr');
        tr.className = 'bg-teal-500 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600';
=======
        loadUser(user);
    });
}

async function loadUser(user) {
    let tr = document.createElement('tr');
        tr.className = 'bg-teal-500 border-b bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600';
>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67
        tr.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">${user.id}</th>
            <td class="px-6 py-4 text-teal-200 dark:text-gray-300">${user.name}</td>
            <td class="px-6 py-4 text-teal-200 dark:text-gray-300">${user.address}</td>
            <td class="px-6 py-4 text-teal-200 dark:text-gray-300">${user.tel}</td>
            <td class="px-6 py-4 text-teal-200 dark:text-gray-300">${user.email}</td>
            <td class="flex px-6 py-4 text-right"><a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a></td>
        `;
        tbody.append(tr);
<<<<<<< HEAD
    });
=======
>>>>>>> 13fab3748a2d72a49e5b0dd0124d3998a1029f67
}

loadUsers();