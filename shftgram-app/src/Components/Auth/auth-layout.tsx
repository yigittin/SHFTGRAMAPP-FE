import React, { ReactNode } from 'react';

const AuthLayout=({children}:any)=>{
    return(
        <div className='grid place-items-center min-h-[100vh]'>
            {children}
        </div>
    )
}

export default AuthLayout