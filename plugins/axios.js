import axios from 'axios';

const token = localStorage.getItem('token')

const instance = axios.create({
    withCredentials: true,
})
instance.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    console.log('3')
    if (error.config && error.response.status === 401 && !originalRequest._isRetry) {
        console.log('4')
        originalRequest._isRetry = true
        try {
            const res = await axios.post('/api/v1/users/refresh')
            localStorage.setItem('token', res.data.accessToken)
            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
            return instance.request(originalRequest)
        } catch (e) {
            console.log(e)
        }
    }
})
if (token !== null) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance