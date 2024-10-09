let db;
const request = indexedDB.open('loginDatabase', 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    let objectStore = db.createObjectStore('users', { keyPath: 'email' });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('password', 'password', { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function(event) {
    console.log('Erro ao abrir o banco de dados:', event.target.errorCode);
};


function saveLoginData(email, password) {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const userData = { email: email, password: password };

    const request = objectStore.add(userData);
    request.onsuccess = function() {
        alert('Cadastro realizado com sucesso!');
    };
    request.onerror = function() {
        alert('Erro: E-mail já cadastrado.');
    };
}

function verifyLoginData(email, password) {
    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');

    const request = objectStore.get(email);
    request.onsuccess = function() {
        const user = request.result;
        if (user) {
            if (user.password === password) {
                document.getElementById("success-modal").style.display = "block";
            } else {
                document.getElementById("modal").style.display = "block";
            }
        } else {
            alert('E-mail não cadastrado. Por favor, cadastre-se.');
        }
    };
    request.onerror = function() {
        console.log('Erro ao buscar o usuário:', request.error);
    };
}


function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}


const loginForm = document.getElementById('login-form');
loginForm.onsubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validateEmail(email)) {
        verifyLoginData(email, password);
    } else {
        alert('Por favor, insira um e-mail válido.');
    }
};

const registerButton = document.getElementById('register-button');
const registerModal = document.getElementById('register-modal');
registerButton.onclick = function() {
    registerModal.style.display = 'block';
};

const closeButton = document.querySelectorAll(".close-button");
closeButton.forEach(button => {
    button.onclick = function() {
        modal.style.display = "none";
        registerModal.style.display = "none";
        document.getElementById("success-modal").style.display = "none";
    };
});

window.onclick = function(event) {
    if (event.target === modal || event.target === document.getElementById("success-modal") || event.target === registerModal) {
        modal.style.display = "none";
        registerModal.style.display = "none";
        document.getElementById("success-modal").style.display = "none";
    }
};


const registerForm = document.getElementById('register-form');
registerForm.onsubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (validateEmail(email) && password) {
        saveLoginData(email, password);
        registerModal.style.display = 'none';
    } else {
        alert('Por favor, insira um e-mail e senha válidos.');
    }
};

const forgotPasswordLink = document.getElementById('forgot-password');
const modal = document.getElementById("modal");
forgotPasswordLink.onclick = function(event) {
    event.preventDefault(); 
    modal.style.display = "block"; 
};



