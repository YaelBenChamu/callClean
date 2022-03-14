import axios from 'axios'
let Http = axios.create({
    baseURL: 'http://localhost:64093/api/',
    credentials: 'include',
    headers: {
        'content-type': 'application/json',
    },
});


export default Http
