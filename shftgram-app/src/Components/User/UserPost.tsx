import { useEffect, useState } from 'react';
import { AddOrUpdatePost, GetFollowers, GetFollowings, GetHomePage, GetUserPage, LikePost, UpdateUser, isUserLoggedIn} from '../../Utils/APICalls';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardFooter, Modal } from 'react-bootstrap';
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import Fav from '@mui/icons-material/Favorite';
import { Add, Delete, Search } from '@mui/icons-material';
const UserPost=()=>{
    const[userData,setUserData]=useState({})
    const[followList,setFollowList]=useState([])

    const[postList,setPostList]=useState([])
    const[postSuccess,setPostSuccess]=useState(Boolean)
    const[postMessage,setPostMessage]=useState('')

    const [loading, setLoading] = useState(true);
    const [isFollower, setIsFollower] = useState(true);
    const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showFollow, setShowFollow] = useState(false);

    const[PostId,setPostId]=useState(0)
    const[PostText,setPostText]=useState('')
    const[modalHeader,setModalHeader]=useState('');

    const[modalFollowHeader,setModalFollowHeader]=useState('')
    
    const[UserName,setUserName]=useState('')
    const[Email,setEmail]=useState('')
    const[Name,setName]=useState('')
    const[SurName,setSurname]=useState('')
    const[PhoneNumber,setPhoneNumber]=useState('')
    const[BioText,setBioText]=useState('')

    const GetInfos=async ()=>{
        const {data: response} = await GetUserPage(null);
        setUserData(response.data);
        setPostList(response.data.posts);
    }

    const likePost=async (id:number)=>{
        await LikePost(id);
        await GetInfos();
    }
    const handleSubmitUser=async(e:any)=>{
        e.preventDefault();
        try{
            var userForm={
                Email:Email,
                Name:Name,
                SurName:SurName,
                Phone:PhoneNumber,
                BioText:BioText,
            }
            await UpdateUser(userForm);
            await GetInfos();
        }catch(error){

        }
    }
    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        try{
            var postForm={
                Id:PostId,
                Text:PostText,
            }
            await AddOrUpdatePost(postForm);
            const {data: response} = await GetUserPage(null);
            setUserData(response.data);
            setPostList(response.data.posts);
        }catch(error){
            
        }
    }
    const handleCloseFollow=()=>setShowFollow(false);
    const handleShowFollow=async (list:string)=>{
        setModalFollowHeader(list);
        if(list==="Following"){
            setIsFollower(false);
            const {data: response} = await GetFollowings(null);
            setFollowList(response.data);
        }
        else if(list==="Followers"){
            setIsFollower(true);
            const {data: response} = await GetFollowers(null);
            setFollowList(response.data);
        }
        setShowFollow(true);
    }
    const handleClose = () => setShow(false);
    const handleShow = (id:number,text:string) => {
        if(id===0)
            setModalHeader('Add');
        else
            setModalHeader('Edit');
        setShow(true);
        setPostId(id);
        setPostText(text);
    }
    const handleCloseUser = () => setShowUser(false);
    const handleShowUser = () => {
        setUserName(userData.userName)
        setEmail(userData.email)
        setName(userData.name)
        setSurname(userData.surName)
        setPhoneNumber(userData.phone)
        setBioText(userData.bioText)
        setShowUser(true);
    }
    const nav= useNavigate();

    useEffect(()  => {
        const fetchData = async () =>{
          setLoading(true);
          try {
            
            const {data: response} = await GetUserPage(null);
            setUserData(response.data);
            setPostList(response.data.posts);
            
          } catch (error) {
            if(error.response.status==401)
                nav('/login');
          }
          console.log(postList);
          setLoading(false);
        }        
        fetchData();
    }, []);
    console.log(postList);
    return (   
        <>
            <div>
                {loading && <div className='grid place-items-center min-h-[100vh] '>Loading ....</div>}
                {!loading && (
                    <div>
                        <div className='container flex justify-center mb-6'>
                            <Card className='col-6'>
                                <Card.Header>
                                    <h5
                                        className="mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        User Profile
                                    </h5>
                                </Card.Header>
                                <Card.Body >
                                    <Card.Text>
                                    <div className='flex justify-content-between'>
                                        <p
                                        className="mb-2 mt-2 font-bold text-neutral-800 dark:text-neutral-50">
                                        {userData.userName}
                                    </p>
                                    <Button variant="link" onClick={()=>handleShowFollow('Followers')}>
                                        <p
                                            className="leading-tight text-neutral-800 dark:text-neutral-50">
                                            Followers : {userData.followerCount}
                                        </p>
                                    </Button>
                                    <Button  variant="link" onClick={()=>handleShowFollow('Following')}>
                                        <p
                                            className="text-neutral-800 dark:text-neutral-50">
                                            Following : {userData.followingCount}
                                        </p>
                                    </Button>
                                        </div>                                
                                    <p
                                        className="mb-2 text-s font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        {userData.bioText}
                                    </p>
                                    </Card.Text>
                                </Card.Body>
                                <CardFooter>
                                <Button  variant="primary" onClick={()=>handleShowUser()}>
                                        Edit Profile
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                        <div className='grid place-items-center '>
                            <Card className='mb-2'>
                            <IconButton color="primary" size='small' aria-label="Add" onClick={()=>handleShow(0,'')}>
                            <Add />
                            Share
                        </IconButton>
                            {postList.map((item) => (
                            <div key={item.id}
                            className="mb-6 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-96">
                                    <Card.Header>
                                    <h5
                                        className="mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        {item.text}
                                    </h5>
                                    </Card.Header>
                                <Card.Body >
                                    <Card.Text>
                                        <p
                                            className="mb-2 text-s leading-tight text-neutral-800 dark:text-neutral-50">
                                            {item.userName}
                                        </p>
                                        <div className='flex justify-content-between'>
                                            <p
                                                className="mb-2 text-s font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                                {item.likeCount} Likes
                                                <IconButton color="primary" aria-label="Like" onClick={() => { likePost(item.id); }}>
                                                    <Fav />
                                                </IconButton>
                                            </p>
                                            <div>
                                                <IconButton color="inherit" aria-label="Edit" onClick={()=>handleShow(item.id,item.text)}>
                                                    <Search />
                                                </IconButton>
                                                <IconButton color="inherit" aria-label="Delete" onClick={()=>handleDelete(item.id)}>
                                                    <Delete />
                                                </IconButton>

                                            </div>
                                        </div>
                                    </Card.Text>                                                            
                                </Card.Body>
                            </div>
                            ))}
                            </Card>
                        </div>

                    </div>
                    
                )}
                </div>     
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
        <Modal show={showUser} onHide={handleCloseUser}       
                    centered size='sm' >
                <Modal.Header closeButton >                        
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                    <form onSubmit={(e)=>handleSubmitUser(e)} >
                        <Modal.Body className='w-96'>
                            <InputLabel htmlFor="mail">
                                E Mail
                            </InputLabel>
                            <Input
                                className='mb-2'
                                id="mail"
                                onChange={(e)=>setEmail(e.target.value)} 
                                value={Email}
                            />
                            <InputLabel htmlFor="Name">
                            Name
                            </InputLabel>
                            <Input
                            className='mb-2'
                                id="Name"
                                onChange={(e)=>setName(e.target.value)}
                                value={Name}
                            />
                            <InputLabel htmlFor="Surname">
                            Surname
                            </InputLabel>
                            <Input
                            className='mb-2'
                                id="Surname"
                                onChange={(e)=>setSurname(e.target.value)}
                                value={SurName}
                            />       
                            <InputLabel htmlFor="Phone">
                            Phone Number
                            </InputLabel>
                            <Input
                            className='mb-2'
                                id="Phone"
                                value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}
                            />     
                            <InputLabel htmlFor="Bio">
                            Bio
                            </InputLabel>
                            <Input
                            className='mb-2'
                                id="Bio"
                                value={BioText} onChange={(e)=>setBioText(e.target.value)}
                            />                     
                           
                        </Modal.Body>
                    <Modal.Footer>
                        <Button  variant="secondary" onClick={handleCloseUser}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleCloseUser}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                    </form>
        </Modal> 
        <Modal show={showFollow} onHide={handleCloseFollow}       
                    centered >
                <Modal.Header closeButton >                        
                    <Modal.Title>{modalFollowHeader} Post</Modal.Title>
                </Modal.Header>
                        <Modal.Body>
                        {loading && <div className='grid place-items-center min-h-[100vh]'>Loading ....</div>}
                        {!loading && (
                            <div>
                                {isFollower && <ul>
                                        {followList.map((item) => (
                                        <li key={item.id}>
                                            <label> {item.followerUserName}</label>
                                        </li>
                                        ))}
                                    </ul>}
                                
                                {!isFollower && <ul>
                                    {followList.map((item) => (
                                    <li key={item.id}>
                                        <label> {item.followingUserName}</label>
                                    </li>
                                    ))}
                                </ul>
                                }
                            </div>

                            
                        )}
                            
                        

                        </Modal.Body>
                    <Modal.Footer>
                        <Button  variant="secondary" onClick={handleCloseFollow}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> 
        </>
    )
}

export default UserPost