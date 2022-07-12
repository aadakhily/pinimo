import axios from 'axios'

const axiosInstanse = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})


export default axiosInstanse