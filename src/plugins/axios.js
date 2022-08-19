import axios from 'axios';


axios.defaults.baseURL = process.env.VUE_APP_API

const instance = axios.create({
    withCredentials: true,
})

instance.interceptors.request.use((config) => {
    config.headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config
})

instance.interceptors.response.use((config) => {
    return config
},async (error) => {
    const originalRequest = error.config;
    if (error.config && error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
            const res = await axios.post('/api/v1/users/refresh')
            localStorage.setItem('token', res.data.accessToken)
            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
            return instance.request(originalRequest)
        } catch (e) {
            if (e.response.status === 404) {
                localStorage.removeItem('token')
            }
        }
    }
    if (error.response) {
        throw error
    }
})


export default instance