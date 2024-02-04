import React from 'react'
import AuthLayout from '../Components/Auth/auth-layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import Post from '../Components/Post/Post';
import { isUserLoggedIn } from '../Utils/APICalls';
import UserPost from '../Components/User/UserPost';

const queryClient=new QueryClient();

const Profile=()=>{
    const check=isUserLoggedIn();
    return(
        <QueryClientProvider client={queryClient}>
            <UserPost></UserPost>
        </QueryClientProvider>
    )
}

export default Profile;