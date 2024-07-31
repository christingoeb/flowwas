import Axios from 'axios';

const axios = Axios.create({
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        indexes: null,
    }
})

export default axios;