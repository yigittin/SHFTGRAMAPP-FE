import React from 'react'
import AuthLayout from '../Components/Auth/auth-layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import Post from '../Components/Post/Post';
import { isUserLoggedIn } from '../Utils/APICalls';

const queryClient=new QueryClient();

const Home=()=>{
    const check=isUserLoggedIn();
    return(
        <QueryClientProvider client={queryClient}>
            <Post></Post>
        </QueryClientProvider>
    )
}

export default Home;