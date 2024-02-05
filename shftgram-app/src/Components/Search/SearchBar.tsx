import { useEffect, useState } from 'react';
import { SearchUser} from '../../Utils/APICalls';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardFooter } from 'react-bootstrap';
import Input from '@mui/material/Input';
import { InputAdornment, InputLabel } from '@mui/material';
import { AccountCircle, Search } from '@mui/icons-material';
const SearchBar=()=>{
    const [loading, setLoading] = useState(true);
    const[userList,setUserList]=useState([]);
    const[searchWord,setSearch]=useState('');
    
    const GetInfos=async ()=>{
        const {data: response} = await SearchUser(searchWord);
        setUserList(response.data);
    }
    
    const nav= useNavigate();

    useEffect(()  => {
        const fetchData = async () =>{
          setLoading(true);
          try {
            await GetInfos()            
          } catch (error) {
            if(error.response.status==401)
                nav('/login');
          }
          console.log(userList);
          setLoading(false);
        }        
        fetchData();
    }, [searchWord]);
    return (   
        <>
            <div className='min-h-[100vh]'>
                <div className='container flex justify-center'>
                    <Card className='col-6'>
                        <Card.Header>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Search User
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                <Search />
                                </InputAdornment>
                            }
                            />

                        </Card.Header>
                        <Card.Body >
                            <ul>
                                {userList.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/user/${item.userId}`}>
                                        {item.userName}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </Card.Body>
                        <CardFooter> 
                        </CardFooter>
                    </Card>
                </div>   
            </div>     

        </>
    )
}

export default SearchBar