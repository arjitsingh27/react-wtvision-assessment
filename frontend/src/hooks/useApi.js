import axios from 'axios';

const useApi = () => {

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/token', { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('token', access)
            localStorage.setItem('refreshToken', refresh)
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const apiCall = async (url, method = 'get', data = null) => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                method,
                url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: data ? JSON.stringify(data) : null,
            };

            const response = await axios(config);
            return response;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    };

    return { login, apiCall };
};

export default useApi;
