const TOKEN_REFRESH_INTERVAL = 3000; // five minutes
const TOKEN_REFRESH_URL = 'http://10.0.31.222:7777';
let timeout = null;

const refreshableFetch = (url, init) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => refreshableFetch(TOKEN_REFRESH_URL), TOKEN_REFRESH_INTERVAL);

    return fetch(url, init);
}

export default refreshableFetch;