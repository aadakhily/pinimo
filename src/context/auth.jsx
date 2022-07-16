import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from 'react'

const authContext = createContext({
    token: '',
    currentUser: {},
    login: () => { },
    logout: () => { },
    updateUser: () => { }
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
        const { email, firstName, lastName, id } = user
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify({ email, firstName, lastName, id }));

        setCurrentUser({ email, firstName, lastName, id });
        setToken(accessToken)
    }

    function updateUser(user) {
        const { email, firstName, lastName, id } = user
        localStorage.setItem('user', JSON.stringify({ email, firstName, lastName, id }));

        setCurrentUser({ email, firstName, lastName, id });
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
        updateUser
    }

    return (
        <authContext.Provider value={providerValue}>{children}</authContext.Provider>
    )
}

export default authContext
