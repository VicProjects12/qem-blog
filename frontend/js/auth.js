// --------- Get the stored token -----------------------------

function getToken() {
    return localStorage.getItem('token');
}

// ---Get the stored user object ------------------------------

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Redirect to login if not authenticated ------------------------------

function requireAuth() {
    if (!getToken()) {
        window.location.href = 'login.html';
    }
}

// -----Redirect away if already logged in ----------------------------------

function redirectIfLoggedIn() {
    if (getToken()) {
        window.location.href = 'dashboard.html';
    }
}

// --------- Make an authenticated fetch request ----------------------------------

async function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

// --------- Logout function --------------------------------------------
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}