import { useState } from 'react';
import { Link} from 'react-router-dom';
import {Register} from '../../Utils/APICalls';
import { Input, TextField } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import Swal from 'sweetalert2';

const RegisterForm=()=>{
    const[UserName,setUserName]=useState('')
    const[Password,setPassword]=useState('')
    const[Email,setEmail]=useState('')
    const[Name,setName]=useState('')
    const[Surname,setSurname]=useState('')
    const[PhoneNumber,setPhoneNumber]=useState('')
    const[isValidMail,setIsValidMail]=useState(false)
    const[isValid,setIsValid]=useState(true);
    const handleChange = (event: { target: { value: any; }; }) => {
        const val = event.target.value;                
        
        if(isEmail(val)) {
            setIsValidMail(true);              
        } else {
            setIsValidMail(false);              
        }
        
        setEmail(val);                
        handleChange(val);;
    }

    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        var inputList=[UserName,Password,Email,Name,Surname,PhoneNumber];
        inputList.forEach(e => {
            if(e===''){
                Swal.fire({
                    text: "Fill all inputs",
                    icon: "warning",
                    confirmButtonText: "OK!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
                setIsValid(false);
            }
        })
        if(isValid){
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
    }

    return (        
        <form onSubmit={(e)=>handleSubmit(e)} className='flex px-16 py-16 flex-col gap-3 max-w-xl shadow-2xl border border-gray-300 rounded-2xl'>
            <div>
                Already have account? Go to <Link to='/login'> Login</Link>
            </div>
            <Input
                className='mb-2 w-96'
                id="Username"
                placeholder='Username'
                value={UserName} onChange={(e)=>setUserName(e.target.value)}
            />
            <Input
                className='mb-2 w-96'
                id="Password"
                type='password'
                placeholder='Password'
                value={Password} onChange={(e)=>setPassword(e.target.value)}
            />
            <Input
                className='mb-2 w-96'
                id="Email"
                placeholder='Email'
                value={Email} onChange={(e)=>setEmail(e.target.value)} 
            />
            <Input
                className='mb-2 w-96'
                id="Name"
                placeholder='Name'
                value={Name} onChange={(e)=>setName(e.target.value)}
            />
            <Input
                className='mb-2 w-96'
                id="Surname"
                placeholder='Surname'
                value={Surname} onChange={(e)=>setSurname(e.target.value)} 
            />
            
            <Input
                className='mb-2 w-96'
                id="Phone"            
                placeholder='Phone'
                value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
            />
            <button type='submit' className='bg-blue-400 rounded shadow-sm text-white text-lg'>  
                Register
            </button>
        </form>
    )
}

export default RegisterForm