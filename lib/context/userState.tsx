"use client"
import { useState } from "react";
import React from 'react';

const userState = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return {isLoggedIn, setIsLoggedIn}
};

export default userState
