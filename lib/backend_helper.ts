import {del, get, post, put} from "./api_helper"

//auth routes
export const verifyGoogleUser = (data:any) => post('/user/verify-google-user',data)
export const getPofile = (data?:any) => post('/user/get-profile',data)
export const emailLogin = (data?:any) => post('/user/email-login',data)
export const emailRegister = (data?:any) => post('/user/email-register',data)
