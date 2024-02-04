import { useEffect, useState } from 'react';
import { GetHomePage, LikePost, isUserLoggedIn} from '../../Utils/APICalls';
import { useQuery } from 'react-query';
import axios from 'axios';
import { IconButton } from '@mui/material';
import Fav from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
const Post=()=>{
    const[postList,setPostList]=useState([])
    const[postSuccess,setPostSuccess]=useState(Boolean)
    const[postMessage,setPostMessage]=useState('')
    const [loading, setLoading] = useState(true);
    const nav= useNavigate();

    const likePost=async (id:number)=>{
        await LikePost(id);
        await GetData();
    }

    const GetData=async()=>{
        const {data: response} = await GetHomePage();
        console.log(response);
        setPostList(response.data);
    }
    useEffect(()  => {
        const fetchData = async () =>{
          setLoading(true);
          try {
            await GetData();
            
          } catch (error) {
            if(error.response.status==401)
                nav('/login');
          }
          setLoading(false);
        }        
        fetchData();
    }, []);
    console.log(postList);
    return (    
        <>
            <div>
                {loading && <div className='grid place-items-center min-h-[100vh] min-w-[100vh]'>Loading ....</div>}
                {!loading && (
                <div className='grid place-items-center'>
                    {postList.map((item) => (
                    <div key={item.id}
                    className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-96">
                     <Link to={`/user/${item.userId}`}>
                        <h5
                            className="mb-2 text-base leading-tight text-neutral-800 dark:text-neutral-50">
                            {item.userName}
                        </h5>
                    </Link> 
                    <p className="mb-4 text-xl font-medium  text-neutral-600 dark:text-neutral-200">
                        {item.text}
                    </p>
                    <p
                        className="mb-2 text-s font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {item.likeCount} Likes
                        <IconButton color="primary" aria-label="Like" onClick={() => { likePost(item.id); }}>
                            <Fav />
                        </IconButton>
                    </p>
                    </div>
                    ))}

                    <ul>

                    </ul>
                </div>
                )}
                </div>

        </>    
    )
}

export default Post