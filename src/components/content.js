import React from "react";
import { fetchData } from "../redux/api";
import { Delete_user } from "../redux/actions";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import "./paginate.css"
import "./content.css"
// import { Checkbox } from "./checkbox";
// import DeleteSelected from "./delete_selected";


const Content = ({ search, fetchData }) => {
  const loading = useSelector((state) => state.loading);
  const data = useSelector((state) => state.list);
  const update_query = useSelector((state) => state.update);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  // const [toppings, setToppings] = useState(data);
  let prevData = data;
 
  const pageVisted = pageNumber + userPerPage;
  const pageCount = Math.ceil(data.length / userPerPage) -1 ;

  const changePage = (event) => {
    const newOffSet = (event.selected * userPerPage) % data.length;
    setPageNumber(newOffSet);
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, []);

  prevData = prevData.filter((e) => {
    return (
      e.name.includes(search) ||
      e.email.includes(search) ||
      e.role.includes(search)
    );
  });




  if (update_query.id) {
    prevData.filter((el) => {
      if (el.id === update_query.id) {
        if (update_query.email) {
          el.email = update_query.email;
        }

        if (update_query.name) {
          el.name = update_query.name;
        }

        if (update_query.role) {
          el.role = update_query.role;
        }
        return el;
      } else {
        return el;
      }
    });
  }

  if (search) {
    return (
      <>
        <tr>
          <th>
            {/* <input
              type="checkbox"
              checked={isChecked}
              onChange={checkHandler}
            /> */}
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        {prevData.map((el) => (
          <tr key={el.id}>
            <td>
              

            </td>
            <td>{el.name}</td>
            <td>{el.email}</td>
            <td>{el.role}</td>
            <td>
              <FiEdit />
              <AiFillDelete onClick={() => Delete_user(el.id)} />
            </td>
          </tr>
        ))}
      </>
    );
  } else {
    return loading === true ? (
      <h1>...loading</h1>
    ) : (
      <>
        <div className="table">
          <tr>
            <th>
              {/* <input
                type="checkbox"
                checked={isChecked}
                onChange={checkHandler}
              /> */}
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          {prevData.slice(pageVisted, pageVisted + userPerPage).map((el, i) => (
            <tr key={el.id}>
              <td>
                
              </td>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.role}</td>
              <td>
                <FiEdit onClick={() => navigate(`update/${el.id}`)} />
                <AiFillDelete onClick={() => dispatch(Delete_user(el.id))} />
              </td>
            </tr>
          ))}
        </div>

        <div className="main_div">
          {" "}
         
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </>
    );
  }
};

export default connect(null, { fetchData })(Content);
