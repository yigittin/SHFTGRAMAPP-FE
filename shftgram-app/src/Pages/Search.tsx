import { QueryClient, QueryClientProvider } from 'react-query';
import Post from '../Components/Post/Post';
import { isUserLoggedIn } from '../Utils/APICalls';
import SearchBar from '../Components/Search/SearchBar';

const queryClient=new QueryClient();

const Search=()=>{
    isUserLoggedIn();
    return(
        <QueryClientProvider client={queryClient}>
            <SearchBar/>
        </QueryClientProvider>
    )
}

export default Search;