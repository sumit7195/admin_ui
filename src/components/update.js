import React, { useEffect, useState } from "react";
import { Update_user } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import "./update.css";
import swal from "sweetalert";

const Update = () => {
  let params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.list);

  let id = params.id;

  const [state, setState] = useState({
    name: "",
    email: "",
    role: "",
    id: params.id,
  });

  useEffect(() => {
    if (data.length !== 0) {
      let found = data.find((item) => item.id === id);

      setState({
        ...state,
        name: found.name,
        email: found.email,
        role: found.role,
      });
    }
  }, []);

  // console.log(data)

  const handelEmail = (e) => {
    let email = e.target.value;

    setState({ ...state, email: email });
  };

  const handelName = (e) => {
    let Name = e.target.value;

    setState({ ...state, name: Name });
  };

  const handelRole = (e) => {
    let Role = e.target.value;

    setState({ ...state, role: Role });
  };

  const handleForm = () => {
    dispatch(Update_user({ ...state }));
    swal("user updated", "Updated successfully", "success");
    navigate(-1);
  };

  return (
    <div className="update_div">
      <h1>Update Your Detail</h1>
      <input
        placeholder="Enter Name"
        value={state.name}
        onChange={handelName}
      />
      <input
        placeholder="Enter email"
        value={state.email}
        onChange={handelEmail}
      />
      <input
        placeholder="Enter Role"
        value={state.role}
        onChange={handelRole}
      />
      <button onClick={handleForm}>Update</button>
    </div>
  );
};

export default Update;
