import { useEffect, useState } from 'react';
import { AddOrUpdatePost, GetHomePage, GetUserId, LikePost, isUserLoggedIn} from '../../Utils/APICalls';
import { useQuery } from 'react-query';
import axios from 'axios';
import { IconButton, Input, InputLabel } from '@mui/material';
import Fav from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap';
import { AccountCircle, Add, Search, Share } from '@mui/icons-material';
const Post=()=>{
    const[postList,setPostList]=useState([])
    const[postSuccess,setPostSuccess]=useState(Boolean)
    const[postMessage,setPostMessage]=useState('')
    const [loading, setLoading] = useState(true);

    const[PostId,setPostId]=useState(0)
    const[PostText,setPostText]=useState('')
    const[modalHeader,setModalHeader]=useState('');
    const [show, setShow] = useState(false);
    const [userId,setUserId]=useState('');
    const nav= useNavigate();
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        try{
            var postForm={
                Id:PostId,
                Text:PostText,
            }
            await AddOrUpdatePost(postForm);
            await GetData();
        }catch(error){
            
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = (id:number,text:string) => {
        if(id===0){
            setModalHeader('Add');
        }
        else
            setModalHeader('Edit');
        setShow(true);
        setPostId(id);
        setPostText(text);
        
        console.log(GetUserId());
    }
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
              setUserId(JSON.parse(GetUserId()).userId);
            
          } catch (error) {
            setLoading(false);
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
        <>
            <div>
                {loading && <div className='grid place-items-center min-h-[100vh] min-w-[100vh]'>Loading ....</div>}
                {!loading && (
                <div className='grid place-items-center'>
                                    <Card>
                    <Card.Header className='d-flex justify-content-between align-items-center'>
                        Latest Posts
                        <IconButton color="primary" size='small' aria-label="Add" onClick={()=>handleShow(0,'')}>
                            <Add />
                            Share
                        </IconButton>
                    </Card.Header>
                    <Card.Body>
                        {postList.map((item) => (
                            <Card key={item.id} className="w-96 mb-3">          
                                <Link to={`/user/${item.userId}`}>
                                    <div className='flex justify-content'>
                                    <AccountCircle color='disabled' />
                                        <h5
                                            className="mb-2 text-base leading-tight text-neutral-800 dark:text-neutral-50">
                                            {item.userName}
                                        </h5>

                                    </div>
                                </Link> 
                            <Card.Body>
                            <Card.Text>
                                {item.text}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted flex justify-content-between">
                                <div>
                                    {item.likeCount} Likes
                                    <IconButton color="primary" aria-label="Like" onClick={() => { likePost(item.id); }}>
                                        <Fav />
                                    </IconButton>
                                </div>
                                    {userId===item.userId &&
                                        <IconButton color="inherit" aria-label="Edit" onClick={()=>handleShow(item.id,item.text)}>
                                            <Search />
                                        </IconButton>
                                    }
                            </Card.Footer>
                        </Card>
                        // <div key={item.id}
                        // className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-96">
                        //  <Link to={`/user/${item.userId}`}>
                        //     <h5
                        //         className="mb-2 text-base leading-tight text-neutral-800 dark:text-neutral-50">
                        //         {item.userName}
                        //     </h5>
                        // </Link> 
                        // <p className="mb-4 text-xl font-medium  text-neutral-600 dark:text-neutral-200">
                        //     {item.text}
                        // </p>
                        // <p
                        //     className="mb-2 text-s font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        //     {item.likeCount} Likes
                        //     <IconButton color="primary" aria-label="Like" onClick={() => { likePost(item.id); }}>
                        //         <Fav />
                        //     </IconButton>
                        // </p>
                        // </div>
                        ))}

                    </Card.Body>
                </Card>
                </div>
                )}
                </div>

        </>    
                        <Modal show={show} onHide={handleClose}       
                        centered >
                    <Modal.Header closeButton >                        
                        <Modal.Title>{modalHeader} Post</Modal.Title>
                    </Modal.Header>
                        <form onSubmit={(e)=>handleSubmit(e)} >
                            <Modal.Body>
                            <InputLabel htmlFor="Post">
                                    Post
                                </InputLabel>
                                <Input
                                    className='mb-2 w-96'
                                    id="Post"
                                    onChange={(e)=>setPostText(e.target.value)}
                                    value={PostText}
                                />
                            </Modal.Body>
                        <Modal.Footer>
                            <Button  variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                        </form>
                    </Modal> 
        </>
    )
}

export default Post