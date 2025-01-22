import ApiServices from "../services";

export const auth = {
    /*Api call to login*/
    login:(data:any)=>ApiServices.postData(`/auth/login`, data)
    .then((res)=>res)
    .catch(err=>console.log(err)),

    /*Api call to logout*/
    logout:(data:any)=>ApiServices.postData(`/auth/logout`, data)
    .then((res)=>res)
    .catch(err=>console.log(err)),
}