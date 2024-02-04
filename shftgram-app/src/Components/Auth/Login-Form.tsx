import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Login } from '../../Utils/APICalls';

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
            <label className='flex flex-col gap-1'>
                Username : 
                <input value={UserName} onChange={(e)=>setUserName(e.target.value)} type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200' />
            </label>
            <label className='flex flex-col gap-1'>
                Password : 
                <input value={Password} onChange={(e)=>setPassword(e.target.value)} type='password' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
            </label>            
            <button className='bg-blue-400 rounded shadow-sm text-white text-lg'>  
                Login
            </button>
        </form>
    )
}

export default LoginForm