import axios from "./axios";

const AuthService = {

    login: function({ username, password }) {
        return axios.post('/api/v1/auth/login',
            { username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
    },  

    signup: function({ email, username, password }) {
        return axios.post('/api/v1/auth/register',
            { email, username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
    },
}

export default AuthService;