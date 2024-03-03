import axios from 'axios'

const axiosRequest = async (Route, postData, token) => {
    if (postData) {
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL + Route}`, postData, { withCredentials: true })
        return data
    } else {
        try {
            const config = {
                withCredentials: true,
                headers: { 'Authorization': `${token || ""}` }
            };
            const { data } = await axios.get(`${process.env.REACT_APP_USER_URL + Route}`, config);
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

}


const blogAxiosRequest = async (Route, postData) => {
    try {
        if (postData) {
            const { data } = await axios.post(`${process.env.REACT_APP_BLOG_URL + Route}`, postData, { withCredentials: true })
            return data
        } else {
            const { data } = await axios.get(`${process.env.REACT_APP_BLOG_URL + Route}`, { withCredentials: true })
            return data
        }
    } catch (error) {
        console.error(error);
    }
}

export const IsLoggedInFunc = async () => {
    const token = localStorage.getItem('token')
    try {
        return (await axiosRequest('IsLoggedIn', false, token)).data
    } catch (error) {
        console.log(error);
        return false
    }
}

export const signupUser = async (userData) => {
    const data = await axiosRequest('signup', userData)
    return data?.status ? false : true
}

export const userLogin = async (userData, setError) => {
    const data = await axiosRequest('postLogin', userData)
    localStorage.setItem('token', data.token)
    setError((rest) => ({ ...rest, emailErr: data?.status }))
    return typeof data?.status === 'string' ? false : data?.status
}

export const Logout = async () => {
    localStorage.removeItem('token')
    window.location.href = '/'
}

export const fetchBlogData = async () => {
    try {
        const { data } = await blogAxiosRequest('blog')
        return data;
    } catch (error) {
        console.error('Error fetching blog data:', error);
        return [];
    }
}