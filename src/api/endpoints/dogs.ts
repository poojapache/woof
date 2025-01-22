import ApiServices from "../services";
import qs from "qs";
import Dog from "../../interfaces/Dog";

export const dogs = {

    /*API call to search and filter dogs based on breeds, zipCodes, ageMin, and ageMax*/
    searchDogs:(filters:any = null)=>{
    const queryString = qs.stringify(filters, { arrayFormat: "brackets" });
    return ApiServices.getData(`/dogs/search?${queryString}`)
    .then((res)=>res)
    .catch(err=>err)},

    /*API call to get dogs based on ids*/
    getDogs:(data:[] = [])=>{
        return ApiServices.postData(`/dogs`, data).then((res)=>res).catch((err)=>err)
    },

    /*API call to get possible dog breeds */
    getBreeds:()=>{
        return ApiServices.getData(`/dogs/breeds`).then((res)=>res).catch((err)=>err)
    },

    /*API call to get the dog match based on slected Ids */
    getMatch:(data:Dog[] = [])=>{
        return ApiServices.postData(`/dogs/match`, data).then((res)=>res).catch((err)=>err);
    }
}