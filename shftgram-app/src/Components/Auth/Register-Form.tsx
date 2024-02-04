import { useState } from 'react';
import { Link} from 'react-router-dom';
import {Register} from '../../Utils/APICalls';

const RegisterForm=()=>{
    const[UserName,setUserName]=useState('')
    const[Password,setPassword]=useState('')
    const[Email,setEmail]=useState('')
    const[Name,setName]=useState('')
    const[Surname,setSurname]=useState('')
    const[PhoneNumber,setPhoneNumber]=useState('')

    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        try{
            var registerForm={
                UserName:UserName,
                Password:Password,
                Email:Email,
                Name:Name,
                Surname:Surname,
                PhoneNumber:PhoneNumber,
            }
            await Register(registerForm);
        }catch(error){

        }
    }

    return (        
        <form onSubmit={(e)=>handleSubmit(e)} className='flex px-16 py-16 flex-col gap-3 max-w-xl shadow-2xl border border-gray-300 rounded-2xl'>
            <div>
                Already have account? Go to <Link to='/login'> Login</Link>
            </div>
            <label className='flex flex-col gap-1'>
                Username : 
                <input value={UserName} onChange={(e)=>setUserName(e.target.value)} type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200' />
            </label>
            <label className='flex flex-col gap-1'>
                Password : 
                <input value={Password} onChange={(e)=>setPassword(e.target.value)}  type='password' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
            </label>
            <label  className='flex flex-col gap-1'>
                Email : 
                <input value={Email} onChange={(e)=>setEmail(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
            </label>
            <label className='flex flex-col gap-1'>
                Name : 
                <input value={Name} onChange={(e)=>setName(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
            </label>
            <label className='flex flex-col gap-1'>
                Surname : 
                <input value={Surname} onChange={(e)=>setSurname(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
            </label>
            <label className='flex flex-col gap-1'>
                Phone Number : 
                <input value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
            </label>
            <button className='bg-blue-400 rounded shadow-sm text-white text-lg'>  
                Register
            </button>
        </form>
    )
}

export default RegisterForm