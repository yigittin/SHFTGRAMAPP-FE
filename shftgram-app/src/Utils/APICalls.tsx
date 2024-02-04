import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const isUserLoggedIn = () => !!(localStorage.getItem('userData') && localStorage.getItem('accessToken'))

export const getUserToken=()=>{
    const token = JSON.parse(localStorage.getItem('accessToken') || '{}');
    return token;
}
export const apiRoute=()=>{
    return "https://localhost:44332/api/";
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
    return (await axios.post(apiLink+'Post/LikePost',{id:id}))
}
