import { useEffect, useState } from 'react';
import { FollowUser, GetFollowers, GetFollowings,  GetUserId,  GetUserPage, LikePost, UnfollowUser} from '../../Utils/APICalls';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardFooter, Modal } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import Fav from '@mui/icons-material/Favorite';
const OtherUser=()=>{
    const[userData,setUserData]=useState({})
    const[followList,setFollowList]=useState([])

    const[postList,setPostList]=useState([])

    const [loading, setLoading] = useState(true);

    const [followed,setFollowed]=useState(false);
    const [isFollower, setIsFollower] = useState(true);
    const [showFollow, setShowFollow] = useState(false);
    const[modalFollowHeader,setModalFollowHeader]=useState('')

    const params = useParams();
    
    const GetInfos=async ()=>{
        const {data: response} = await GetUserPage(params.id);
        setUserData(response.data);
        setPostList(response.data.posts);
        setFollowed(response.data.isFollowed);
    }

    const likePost=async (id:number)=>{
        await LikePost(id);
        await GetInfos();
    }

    const follow=async()=>{
        await FollowUser(params.id);
        await GetInfos();
    }
    const unfollow=async()=>{
        await UnfollowUser(params.id);
        await GetInfos();
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
    const nav= useNavigate();

    useEffect(()  => {
        const fetchData = async () =>{
          setLoading(true);
          var ex=JSON.parse(GetUserId());
          if(ex.userId===params.id)
            nav('/profile');
          try {
            await GetInfos()            
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
                                {!followed &&<Button  variant="primary" onClick={()=>follow()}>
                                        Follow
                                    </Button>}
                                    {followed && <Button  variant="secondary" onClick={()=>unfollow()}>
                                        Unfollow
                                    </Button>}   
                                </CardFooter>
                            </Card>
                        </div>
                        <div className='grid place-items-center min-h-[100vh] min-w-[100vh]'>
                            <Card>
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

                                </Card.Body>
                            <p className="mb-4 text-xl text-neutral-600 dark:text-neutral-200">
                                

                                {/* <IconButton color="primary" aria-label="Like" onClick={() => { likePost(item.id); }}>
                                    <Fav />
                                </IconButton> */}
                            </p>

                            </div>
                            ))}
                            </Card>
                        </div>

                    </div>
                    
                )}
                </div>     
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

export default OtherUser