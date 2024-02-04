import { useEffect, useState } from 'react';
import { SearchUser} from '../../Utils/APICalls';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardFooter } from 'react-bootstrap';
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
            <div>
                <div className='row justify-center mb-6'>
                    <Card className='col-6'>
                        <Card.Header>
                        <label  className='flex flex-col gap-1'>
                            Search : 
                            <input value={searchWord} onChange={(e)=>setSearch(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
                        </label>
                        </Card.Header>
                        <Card.Body >
                            <Card.Text>
                            <ul>
                                {userList.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/user/${item.userId}`}>
                                        {item.userName}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                            </Card.Text>
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