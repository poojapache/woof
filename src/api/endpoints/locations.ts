import ApiServices from "../services";
import qs from "qs";
import Location from "../../interfaces/Location";

  export const locations = {

    /*API call to get location/s based on zip code/s*/
    getLocation: (zipCodes: string[]) => {
      return ApiServices.postData(`/locations`, zipCodes)
        .then((res) => res as Location[])
        .catch((err) => err);
    },

    /*API call to get location/s based on filters city/state*/
    searchLocation: (filters:any = null)=>{
        const queryString = qs.stringify(filters);
        return ApiServices.postData(`/locations/search?${queryString}`, filters)
        .then((res)=>res as Location[])
        .catch((err)=>err);
    }
  };
  

