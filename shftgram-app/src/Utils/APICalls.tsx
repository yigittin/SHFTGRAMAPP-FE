import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const isUserLoggedIn = () => !!(localStorage.getItem('userData') && localStorage.getItem('accessToken'))

export const GetUserId=()=>{
    return localStorage.getItem('userData')
}

export const getUserToken=()=>{
    const token = JSON.parse(localStorage.getItem('accessToken') || '{}');
    return token;
}
export const apiRoute=()=>{
    return "https://localhost:7083/api/";
}

export const Register= async(dto:any)=>{
    console.log(dto);
    const apiLink=apiRoute();
    console.log(apiLink);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    await axios.post(apiLink+'Login/Register', { UserName: dto.UserName, Password: dto.Password,Email:dto.Email,PhoneNumber:dto.PhoneNumber,Name:dto.Name,Surname:dto.Surname})
      .then(r => {
        var data=r.data;
        if(data.success){
            const accessToken = JSON.stringify(data.data.accessToken);
            const userData=JSON.stringify(data.data.userData);
            localStorage.setItem('userData', userData)
            localStorage.setItem('accessToken',accessToken)
            Swal.fire({
              text: "Register succesful! Redirecting...",
              icon: "success",
              buttonsStyling: !1,
              confirmButtonText: "OK!",
              customClass: {
                  confirmButton: "btn btn-primary"
              }
          }).then((function (t:any) {
            if (t.isConfirmed) {
                window.location.href="/";
            }
        }))          
        }
        else{
            Swal.fire({
                text: data.message,
                icon: "error",
                buttonsStyling: !1,
                confirmButtonText: "OK!",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });        
        }
        }).catch(e => {
        console.log(e);
      });
 
}
export const Login= async(dto:any)=>{
    console.log(dto);
    const apiLink=apiRoute();
    console.log(apiLink);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    await axios.post(apiLink+'Login/Login', { UserName: dto.UserName, Password: dto.Password})
      .then(r => {
        var data=r.data;
        if(data.success){
            const accessToken = JSON.stringify(data.data.accessToken);
            const userData=JSON.stringify(data.data.userData);
            localStorage.setItem('userData', userData)
            localStorage.setItem('accessToken',accessToken)
            Swal.fire({
              text: "Login succesful! Redirecting...",
              icon: "success",
              confirmButtonText: "OK!",
              customClass: {
                  confirmButton: "btn btn-primary"
              }
          }).then((function (t:any) {
            if (t.isConfirmed) {
                window.location.href="/";
            }
        }))          
        }
        else{
            Swal.fire({
                text: data.message,
                icon: "error",
                confirmButtonText: "OK!",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });        
        }
        }).catch(e => {
        console.log(e);
      });
 
}
export const SignOutCall= async()=>{

    localStorage.removeItem('userData');        
    localStorage.removeItem('accessToken');         
}
export const GetHomePage=async ()=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    return await axios.get(apiLink+'Post/GetHomePage')
}

export const LikePost=async(id:number)=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    return (await axios.post(apiLink+'Post/LikePost',id))
}
export const FollowUser=async(id:any)=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    return (await axios.post(apiLink+'User/Follow',id))
}
export const UnfollowUser=async(id:any)=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    return (await axios.post(apiLink+'User/Unfollow',id))
}
export const AddOrUpdatePost=async(dto:any)=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    return (await axios.post(apiLink+'Post/AddOrUpdatePost',{Id:dto.Id,Text:dto.Text}))
}
export const DeletePost=async(id:any)=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    return (await axios.delete(apiLink+'Post/PostDelete?id='+id));
}  
export const GetUserPage=async (id:any)=>{
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    if(id===null)
        return await axios.get(apiLink+'User/GetUserPage');
    return await axios.get(apiLink+'User/GetUserPage?id='+id)
    
}
export const SearchUser=async (word:string)=>{
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    return await axios.get(apiLink+'User/SearchUser?search='+word)
    
}
  export const GetFollowers=async (id:any)=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    if(id===null)
        return await axios.get(apiLink+'User/GetFollowers');
    return await axios.get(apiLink+'User/GetFollowers?id='+id)
    
}
  export const GetFollowings=async (id:any)=>{
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const userToken=getUserToken();
    const apiLink=apiRoute();
    axios.defaults.headers.common["Authorization"]=`Bearer ${userToken}`;
    if(id===null)
        return await axios.get(apiLink+'User/GetFollowings');
    return await axios.get(apiLink+'User/GetFollowings?id='+id)
    
}
export const UpdateUser=async (dto:any)=>{
    console.log(dto);
    const apiLink=apiRoute();
    console.log(apiLink);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    await axios.post(apiLink+'User/UpdateProfile', dto)
      .then(r => {
        var data=r.data;
        console.log(data);
        if(data.success){
            Swal.fire({
              text: "Update succesful!",
              icon: "success",
              buttonsStyling: !1,
              confirmButtonText: "OK!",
              customClass: {
                  confirmButton: "btn btn-primary"
              }
          }).then((function (t:any) {
            if (t.isConfirmed) {
            }
        }))          
        }
        else{
            Swal.fire({
                text: data.message,
                icon: "error",
                buttonsStyling: !1,
                confirmButtonText: "OK!",
                customClass: {
                    confirmButton: "btn btn-primary"
                }
            });        
        }
        }).catch(e => {
        console.log(e);
      });
}