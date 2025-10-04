import axios from 'axios'

const PORT = 8000
const url = `http://localhost:${PORT}`

axios.defaults.withCredentials = true

// Get CSRF token from cookies
const getCSRFToken = () => {
    const name = 'csrftoken'
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

// Get initial CSRF token from server
export const getInitialCSRFToken = () => {
    return axios.get(`${url}/api/test`)
}

// Add CSRF token to all requests
axios.interceptors.request.use(function (config) {
    const csrfToken = getCSRFToken()
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

export const upload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${url}/api/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const getFileList = () => axios.get(`${url}/api/files`)
export const getFile = (fileId) => axios.get(`${url}/api/files/${fileId}`, { responseType: 'blob' })

export const login = (username, password) => axios.post(`${url}/api/login`, { username, password })
export const register = (username, password) => axios.post(`${url}/api/register`, { username, password })
export const logout = () => axios.post(`${url}/api/logout`)
export const authCheck = () => axios.get(`${url}/api/auth-check`)