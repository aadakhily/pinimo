import axios from 'axios'

function getAuthorizationToken() {
    return localStorage.getItem('token')
}

function logoutUser(){
    localStorage.removeItem('token')
    window.location.replace('/login')
}

const fetchApi = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,

    headers: {
        Authorization: `Bearer ${getAuthorizationToken()}`,
    },
})

fetchApi.interceptors.response.use(
    (response) => { return response },

    (error) => {
        if (error?.response?.status === 401) {
            logoutUser()
        }
    
        return Promise.reject(error)
    }
)


export default fetchApi