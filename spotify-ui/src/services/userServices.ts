import axios from 'axios';

const processLogin = async function (username: string, password: string) {
    const response = await axios.post('http://localhost:5001/login', {
        username: username,
        password: password,
    });
    return <string> response.data;
}
export {processLogin}