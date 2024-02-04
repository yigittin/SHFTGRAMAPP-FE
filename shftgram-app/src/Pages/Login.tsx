import React, { useEffect } from 'react'
import AuthLayout from '../Components/Auth/auth-layout';
import LoginForm from '../Components/Auth/Login-Form';
import { isUserLoggedIn } from '../Utils/APICalls';
import { useNavigate } from 'react-router-dom';

const Login=()=>{
    const check=isUserLoggedIn();
    var nav=useNavigate();
    useEffect(()  => {
        if(check)
            nav('/');
    }, []);
    return(
        <AuthLayout>
            <LoginForm/>
        </AuthLayout>
    )
}

export default Login;