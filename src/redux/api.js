import { fetch_data,Error_loading,Data_loading } from "./actions";

import axios from "axios";


export const  fetchData = ()=>{


    return function(dispatch){

            
            dispatch(Data_loading());
        
           return axios.get(
             "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
           ).then(({data})=>{
               dispatch(fetch_data(data));
           })
           .catch((error)=>{
               const errorMsg = error.message;
               dispatch(Error_loading(errorMsg))
           }) 

    }

}