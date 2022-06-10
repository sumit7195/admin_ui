import {
  fetch_all_data,
  data_loading,
  error_loading,
  delete_user,
  update_user
} from "./actionType";

const initalState = {
  loading: false,
  list: [],
  error: "",
  update: ''
};


export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case fetch_all_data:
            
    return { ...state, list:action.payload.map((el)=>{
      return {...el , checked:false}
    }), loading: false };


    case data_loading:
      return { ...state, loading: true };

      case error_loading:
      return { ...state, error: action.payload };

          
       
    case delete_user : 
       
       let newData = state;

        let result = newData.list.filter((e)=>{
          return e.id !== action.payload
        })

      return {...newData, list:result}


    case update_user : 
      
          return {...state,  update : action.payload}       
    
   
    

 
default:
      return state;
  }
};
