import { useEffect, useState } from 'react';
import { AddOrUpdatePost, GetFollowers, GetFollowings, GetHomePage, GetUserPage, LikePost, UpdateUser, isUserLoggedIn} from '../../Utils/APICalls';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardFooter, Modal } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import Fav from '@mui/icons-material/Favorite';
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
                {loading && <div className='grid place-items-center min-h-[100vh] min-w-[100vh]'>Loading ....</div>}
                {!loading && (
                    <div>
                        <div className='row justify-center mb-6'>
                            <Card className='col-6'>
                                <Card.Header>
                                    <h5
                                        className="mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        User Profile
                                    </h5>
                                </Card.Header>
                                <Card.Body >
                                    <Card.Text>
                                    <p
                                        className="mb-2 text-s leading-tight text-neutral-800 dark:text-neutral-50">
                                        {userData.userName}
                                    </p>
                                    <p
                                        className="mb-2 text-s leading-tight text-neutral-800 dark:text-neutral-50">
                                        Takip Edilenler : {userData.followingCount}
                                        <Button  variant="primary" size='sm' onClick={()=>handleShowFollow('Following')}>
                                            List
                                        </Button>
                                    </p>
                                    <p
                                        className="mb-2 text-s leading-tight text-neutral-800 dark:text-neutral-50">
                                        Takipçiler : {userData.followerCount}
                                        <Button  variant="primary" size='sm' onClick={()=>handleShowFollow('Followers')}>
                                        List
                                        </Button>
                                    </p>
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
                        <div className='grid place-items-center min-h-[100vh] min-w-[100vh]'>
                            <Card>
                            <Button className='mb-5' variant="success" size="lg" onClick={()=>handleShow(0,'')}>
                                Add New Post
                            </Button>
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
                                    <p
                                        className="mb-2 text-s font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                        {item.likeCount} Likes
                                        <IconButton color="primary" aria-label="Like" onClick={() => { likePost(item.id); }}>
                                            <Fav />
                                        </IconButton>
                                    </p>
                                    </Card.Text>
                                                            
                                    <Button  variant="primary" onClick={()=>handleShow(item.id,item.text)}>
                                        Edit
                                    </Button>
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
                                <label >
                                    <input value={PostText} onChange={(e)=>setPostText(e.target.value)} type='textarea' className='w-96 p-3 border-gray-500 shadow-sm bg-gray-200'/>
                                </label>
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
                    centered >
                <Modal.Header closeButton >                        
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                    <form onSubmit={(e)=>handleSubmitUser(e)} >
                        <Modal.Body>
                            <label  className='flex flex-col gap-1'>
                                Email : 
                                <input value={Email} onChange={(e)=>setEmail(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
                            </label>
                            <label className='flex flex-col gap-1'>
                                Name : 
                                <input value={Name} onChange={(e)=>setName(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
                            </label>
                            <label className='flex flex-col gap-1'>
                                Surname : 
                                <input value={SurName} onChange={(e)=>setSurname(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
                            </label>
                            <label className='flex flex-col gap-1'>
                                Phone Number : 
                                <input value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
                            </label>
                            <label className='flex flex-col gap-1'>
                                Bio : 
                                <input value={BioText} onChange={(e)=>setBioText(e.target.value)}  type='text' className='p-3 border-gray-500 shadow-sm bg-gray-200'/>
                            </label>
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
                        {loading && <div className='grid place-items-center min-h-[100vh] min-w-[100vh]'>Loading ....</div>}
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