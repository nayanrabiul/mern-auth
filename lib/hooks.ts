import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";
import firebase from "firebase/compat";
import functions = firebase.functions;

export const useFetch = (func, query: any = {}, load = true):Array<any> => {
    const router = useRouter()
    const [data, setData] = useState();
    const [loading, setLoading] = useState(load)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [params, setParams] = useState({
        ...query,
        page: query?.page || 1,
        size: query?.size || 10,
    })

    useEffect(() => {
        if (load) {
            getData(params)
        }
    }, []);


    const getData = (query) => {
        setLoading(true)
        setError(false)
        setParams({...params, ...query})
        try {

            func({...params, ...query}).then(({error, data, msg, meta, ...rest}) => {
                setLoading(false)
                if (error === false) {
                    setData(data)
                } else {
                    setError(true)
                    setErrorMessage(msg)
                    setData(undefined)
                }
                if (rest) {
                    if ((Object.values(rest) + "").replaceAll(',', '') === 'Unauthorized.') {
                        router.push('/login')
                    }
                }

            }).catch(e => {
                console.log(e)
            })
        } catch (e) {
            console.log(e)
            console.log(func)


        }
    }
    const clear = () => setData(undefined)
    return [data, getData, {query: params, loading, error, errorMessage, clear}];
}

export const useAction = async (func, data, reload?: Function, alert = true, t?: Function) : Promise<any>=> {
    //trigger upper loader bar like youtube
    const {error, msg, data: d,token} = await func({...data})
    // hideLoader()
    console.log(t)
    if (error === false) {
        if (reload) {
            reload(d)
        }
        if (!!alert) {
            //show alert modal
        }
    } else {
        ////show error alert modal
    }
    return {error, msg, data: d,token}
}


export const userOutSideClick = (ref, func) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                func && func()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


export const useLocations = () => {
    const [date, setData] = useState({})
    useEffect(() => {
        (async () => {
            const {data} = await axios.get('/locations.json')
            setData(data)
        })()
    }, [])
    return date
}
