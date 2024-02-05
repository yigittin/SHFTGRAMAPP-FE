import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Login } from '../../Utils/APICalls';
import { Input, InputLabel } from '@mui/material';

const LoginForm=()=>{
    const[UserName,setUserName]=useState('')
    const[Password,setPassword]=useState('')

    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        try{
            var loginForm={
                UserName:UserName,
                Password:Password
            }
            await Login(loginForm);
        }catch(error){

        }
    }
    
    return (        
        <form onSubmit={(e)=>handleSubmit(e)} className='flex px-16 py-16 flex-col gap-3 max-w-xl shadow-2xl border border-gray-300 rounded-2xl'>
            <div>
                Don't have account? Go to <Link to='/register'> Register</Link>
            </div>
            <Input
                className='mb-2 w-96'
                id="Username"
                placeholder='Username'
                value={UserName} onChange={(e)=>setUserName(e.target.value)}
            />
            <Input
                className='mb-2 w-96'
                placeholder='Password'
                id="Password"
                type='password'
                value={Password} onChange={(e)=>setPassword(e.target.value)}
            />           
            <button type='submit' className='bg-blue-400 rounded shadow-sm text-white text-lg'>  
                Login
            </button>
            
        </form>
    )
}

export default LoginForm