"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // use this for App Router

const Protected = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

    useEffect(() => {
        const loginStatus = localStorage.getItem("loginStatus");
        if (!loginStatus) {
            router.replace("/"); // redirect to homepage or login page
        } else {
            setIsLoggedIn(true);
        }
    }, [router]);

    if (isLoggedIn === null) {
        return <div>Loading...</div>; // show while checking login status
    }

    return <>{children}</>;
};

export default Protected;
