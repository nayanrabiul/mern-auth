import React, {useState, useEffect} from 'react';
import {initializeApp, FirebaseOptions} from 'firebase/app';
import {getAuth, Auth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {Button} from '@/components/ui/button';
import {useRouter} from "next/router";
import {User} from '@/lib/types'
import {verifyGoogleUser} from '@/lib/backend_helper'
import {useUserContext} from '@/lib/context/user_context'
import {useAction, useFetch} from "@/lib/hooks";
import {any} from "prop-types";
import GoogleSvg from "@/public/google";

const SocialSignIn: React.FC = () => {
    const router = useRouter()
    // @ts-ignore
    const {isLoggedIn, setIsLoggedIn} = useUserContext()

    const firebaseConfig = {
        apiKey: "AIzaSyDB_gdWiGBp5BX1yvuWXTUM-H1PrmGtvGE",
        authDomain: "logintest-57cf1.firebaseapp.com",
        projectId: "logintest-57cf1",
        storageBucket: "logintest-57cf1.appspot.com",
        messagingSenderId: "1071541860748",
        appId: "1:1071541860748:web:8febce6b91219ff288bea9",
        measurementId: "G-2N6N5M3NWK"
    };

    //initialize  firebase
    const app = initializeApp(firebaseConfig);
    const auth: Auth = getAuth(app);

    // Sign out of Firebase.
    function signOutUser() {
        signOut(getAuth());
    }


    const handleGoogleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(async (res) => {
                const data: User = {
                    name: res.user.displayName,
                    photoURL: res.user.photoURL,
                    phone: res.user.phoneNumber,
                    email: res.user.email,
                    access_token: await res.user.getIdToken(),
                    auth_type: "google",
                };
                // try to verify from server
                try {
                    const {data: user, token, error} = await useAction(verifyGoogleUser, data)

                    if (error === true) {
                        //show false notification
                        alert('error')
                    }
                    if (user?.email && !error) {
                        token && localStorage.setItem('authToken', token);
                        user?.auth_type && localStorage.setItem('auth_type', user?.auth_type)
                        setIsLoggedIn(true);
                        switch (user?.role) {
                            case 'admin':
                                await router.push("/admin")
                                break;
                            case 'user':
                                await router.push("/user")
                                break;
                            default:
                                await router.push("/")
                        }

                    } else {
                        //collect extra data like phone
                        console.log('extra data collection triggered')
                        // token && localStorage.setItem('authToken', token);
                        // user?.auth_type && localStorage.setItem('auth_type', user?.auth_type)
                        // router.push(`/profile/?role=${user?.role}&auth_type=${user?.auth_type}`);
                        // toast.error("You must provide phone number to continue");
                        // setLoading(false)
                    }
                } catch (err) {
                    alert(err.message)
                }
            })
            .catch((err) => {
                console.log("error: ", err.message);
            });
    };


    return (
        <div>
            {/*Sign in with Google with svg*/}
            <Button
                onClick={handleGoogleLogin}
            >
                <GoogleSvg/>
                Sign in with Google
            </Button>

        </div>
    );
};

export default SocialSignIn;
