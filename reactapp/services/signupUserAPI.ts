// import axios
import Axios from 'axios'

// login function
const SignUp = (data: any) => {
    return Axios.post('/auth/local/register', data , {
        baseURL: import.meta.env.VITE_BASE_URL_API,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

export default { SignUp }