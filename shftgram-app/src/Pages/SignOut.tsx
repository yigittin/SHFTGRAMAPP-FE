import React, { useEffect } from 'react'
import AuthLayout from '../Components/Auth/auth-layout';
import LoginForm from '../Components/Auth/Login-Form';
import { SignOutCall, isUserLoggedIn } from '../Utils/APICalls';
import { useNavigate } from 'react-router-dom';

const SignOut=()=>{
    const check=isUserLoggedIn();
    var nav=useNavigate();
    useEffect(()  => {
        if(check)
            SignOutCall()
            nav('/Login');
    }, []);
    return(
        <AuthLayout>
            <LoginForm/>
        </AuthLayout>
    )
}

export default SignOut;