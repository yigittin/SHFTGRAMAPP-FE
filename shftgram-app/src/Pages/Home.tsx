import { QueryClient, QueryClientProvider } from 'react-query';
import Post from '../Components/Post/Post';
import { isUserLoggedIn } from '../Utils/APICalls';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const queryClient=new QueryClient();

const Home=()=>{
    const [isLogedIn,setIsLogedIn]=useState(isUserLoggedIn())
    const nav=useNavigate();
    useEffect(()  => {
        if(!isLogedIn)
            nav('/login');
    }, []);
    isUserLoggedIn();
    return(
        <QueryClientProvider client={queryClient}>
            <Post></Post>
        </QueryClientProvider>
    )
}

export default Home;