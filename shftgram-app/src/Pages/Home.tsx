import { QueryClient, QueryClientProvider } from 'react-query';
import Post from '../Components/Post/Post';
import { isUserLoggedIn } from '../Utils/APICalls';

const queryClient=new QueryClient();

const Home=()=>{
    isUserLoggedIn();
    return(
        <QueryClientProvider client={queryClient}>
            <Post></Post>
        </QueryClientProvider>
    )
}

export default Home;