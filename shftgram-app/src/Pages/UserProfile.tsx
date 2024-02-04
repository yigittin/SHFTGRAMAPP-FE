import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { isUserLoggedIn } from '../Utils/APICalls';
import { useNavigate } from 'react-router-dom';
import OtherUser from '../Components/User/OtherUser';

const queryClient=new QueryClient();

const UserProfile=()=>{
    const check=isUserLoggedIn();
    var nav=useNavigate();
    useEffect(()  => {
        if(!check)
            nav('/login');
    }, []);
    return(
        <QueryClientProvider client={queryClient}>
            <OtherUser></OtherUser>
        </QueryClientProvider>
    )
}

export default UserProfile;