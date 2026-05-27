const token = localStorage.getItem('biotecher_token');

function decodePayload(jwt) {
    const payload = jwt.split('.')[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    return JSON.parse(atob(padded));
}

function isTokenExpired(jwt) {
    try {
        const payload = decodePayload(jwt);
        if (!payload || !payload.exp) return true;
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
}

if (!token || isTokenExpired(token)) {
    localStorage.removeItem('biotecher_token');
    localStorage.removeItem('biotecher_user');
    localStorage.removeItem('biotecher_role');
    localStorage.removeItem('biotecher_access_type');
    window.location.replace('/login.html');
}