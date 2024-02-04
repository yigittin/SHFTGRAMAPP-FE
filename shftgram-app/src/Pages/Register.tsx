import React, { useEffect } from 'react'
import AuthLayout from '../Components/Auth/auth-layout'
import RegisterForm from '../Components/Auth/Register-Form';
import { isUserLoggedIn } from '../Utils/APICalls';
import { useNavigate } from 'react-router-dom';
const Register=()=>{
    const check=isUserLoggedIn();
    var nav=useNavigate();
    useEffect(()  => {
        if(check)
            nav('/');
    }, []);
    return(
        <AuthLayout>
            <RegisterForm/>
        </AuthLayout>
    )
}

export default Register;