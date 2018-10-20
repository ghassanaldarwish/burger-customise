import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-burger-c1179.firebaseio.com/'
})


export default instance