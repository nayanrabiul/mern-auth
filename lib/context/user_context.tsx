"use client"

import {createContext, useContext, useState} from "react";
export const UserContext = createContext({});


export const useUserContext = ():any=> useContext(UserContext);






