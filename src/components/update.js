import React, {useState} from 'react';
import {Update_user} from "../redux/actions"
import { useDispatch} from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import swal from "sweetalert";
 
const Update = () => {

    let params = useParams();
    const navigate = useNavigate();
  
  const dispatch = useDispatch();

    const [state, setState] = useState({
        name: "",
        email: "",
        role : "",
        id: params.id
    })


 


 const handelEmail = (e)=>{

    let email = e.target.value;
    
    setState({...state, email:email})
}

 const handelName = (e) => {
   let Name = e.target.value;

   setState({...state, name:Name});
 };



 const handelRole = (e) => {
   let Role = e.target.value;

   setState({...state, role:Role});
 };

const handleForm = ()=>{
    
   
    dispatch(Update_user({...state}));
    swal('Updated successfully')
    navigate(-1)
}


 

    return (
      <div>
        <input placeholder="Enter email" onChange={handelEmail} />
        <input placeholder="Enter Name" onChange={handelName} />
        <input placeholder="Enter Role" onChange={handelRole} />
        <button onClick={handleForm} >Update</button>
      </div>
    );
}

export default Update;
