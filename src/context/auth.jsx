import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from 'react'

const authContext = createContext({
    token: '',
    user: {},
    login: () => { },
    logout: () => { },
})

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const { localToken, localUser } = loadLocalToken()

        if (!localToken) return navigate('/login', { replace: true })

        setToken(localToken)
        setCurrentUser(localUser)
    }, [token])


    function loadLocalToken() {
        const localToken = localStorage.getItem('token')
        const localUser = localStorage.getItem('user')

        return { localToken, localUser: JSON.parse(localUser) }
    }

    function login({ accessToken, user }) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));

        setCurrentUser(user);
        setToken(accessToken)
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setCurrentUser({});
        setToken('')
    }

    const providerValue = {
        token,
        login,
        logout,
        currentUser,
    }

    return (
        <authContext.Provider value={providerValue}>{children}</authContext.Provider>
    )
}

export default authContext
