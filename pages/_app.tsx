import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {UserContext} from "@/lib/context/user_context";
import {useEffect, useState} from "react";

export default function App({Component, pageProps}: AppProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])
    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}
