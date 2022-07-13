import { createContext, useState } from 'react'

const authContext = createContext({
    token: '',
    user: {},
    login: () => { },
    logout: () => { },
    loadTokenAndUser: () => { }
})

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('')
    const [currentUser, setCurrentUser] = useState({});


    function loadTokenAndUser() {
        const localToken = localStorage.getItem('token')
        const localUser = localStorage.getItem('user')


        setToken(localToken)
        setCurrentUser(JSON.parse(localUser))
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
        loadTokenAndUser
    }

    return (
        <authContext.Provider value={providerValue}>{children}</authContext.Provider>
    )
}

export default authContext
