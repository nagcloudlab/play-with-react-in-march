

// using DOM API to manipulate the web page
// --------------------------------------------

const greetBtn = document.querySelector('#greet-btn');
const cardBody = document.querySelector('.card-body');

greetBtn.addEventListener('click', (event) => {
    const currentTime = new Date().getHours();
    let greeting = '';

    if (currentTime < 12) {
        greeting = 'Good morning!';
    } else if (currentTime < 18) {
        greeting = 'Good afternoon!';
    } else {
        greeting = 'Good evening!';
    }

    const greetingElement = document.createElement('p');
    greetingElement.textContent = greeting;
    cardBody.appendChild(greetingElement);
});



// using DOM API to manipulate the web page + XHR/fetch API to fetch data from the server
// ------------------------------------------------------------------

const top5TodosBtn = document.querySelector('#top5-todos-btn');
const todosBody = document.querySelector('#todos-body');
const progressMessage = document.querySelector('#progress-message');
top5TodosBtn.addEventListener('click', (event) => {
    const xhr = new XMLHttpRequest(); // xhr object to make HTTP requests
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos?_limit=5', true);
    xhr.send(); // blocking call
    progressMessage.textContent = 'Loading...';

    xhr.onload = function () {
        if (xhr.status === 200) {
            progressMessage.textContent = '';
            const todos = JSON.parse(xhr.responseText);
            const jsonResponse = JSON.parse(xhr.responseText);
            const todoRows = jsonResponse.map(todo => `<tr>
        <td>${todo.id}</td>
        <td>${todo.title}</td>
        <td>${todo.completed}</td>
    </tr>`).join('');
            todosBody.innerHTML = todoRows;
        } else {
            progressMessage.textContent = 'Failed to load data';
        }
    };

    xhr.onerror = function () {
        progressMessage.textContent = 'An error occurred while fetching data';
    };
});

