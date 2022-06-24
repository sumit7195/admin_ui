import React, { useState, useEffect } from "react";
import { fetchData } from "../redux/api";
import { Delete_user, Deleted_selected } from "../redux/actions";

import { useSelector, useDispatch, connect } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import swal from "sweetalert";

const Content = ({ search, fetchData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const myRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState([]);

  const loading = useSelector((state) => state.loading);
  const [searchEl, setSearchEl] = useState([]);
  const data = useSelector((state) => state.list);
  // const error = useSelector((state) => state.error);
  const [pageNumber, setpageNumber] = useState(0);
  const userPerPage = 10;
  const pageVisited = pageNumber * userPerPage;
  const pageCount = Math.ceil(data.length / userPerPage);
  const changePage = ({ selected }) => {
    setpageNumber(selected);
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, [fetchData, data.length]);

  const handleSearch = (search) => {
    let newState = data;
    // let listItem = newState.list;

    let newItem = newState.filter(
      (item) =>
        item.name.includes(search) ||
        item.email.includes(search) ||
        item.role.includes(search)
    );

    setSearchEl(newItem);
  };

  const onCheck = (item) => {
    setSelectedUser([...selectedUser, item]);
  };

  const onUncheck = (item) => {
    let items = selectedUser.filter((el) => el !== item);

    setSelectedUser(items);
  };

  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="main_div">
        <input
          className="input_div"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          placeholder="Search by name,email or Role"
        />

        {data.length === 0 && <div>No Data found</div>}

        <table>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>

          {searchEl.length !== 0
            ? searchEl
                .slice(pageVisited, pageVisited + userPerPage)
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <AiOutlineEdit
                        className="editIcon"
                        onClick={() => {
                          navigate(`/update/${item.id}`);
                        }}
                      />
                      <AiOutlineDelete
                        className="deleteIcon"
                        onClick={() => {
                          const promise = new Promise((resolve, reject) => {
                            resolve(dispatch(Delete_user(item.id)));
                          });

                          promise.then(() => {
                            swal("User Deleted");
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))
            : data
                .slice(pageVisited, pageVisited + userPerPage)
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        //  ref = {myRef+item.id}
                        id={item.id}
                        onClick={(e) => {
                          if (e.currentTarget.checked) {
                            onCheck(e.currentTarget.id);
                          } else if (!e.currentTarget.checked) {
                            onUncheck(e.currentTarget.id);
                          }
                        }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <AiOutlineEdit
                        className="editIcon"
                        onClick={() => {
                          navigate(`/update/${item.id}`);
                        }}
                      />
                      <AiOutlineDelete
                        className="deleteIcon"
                        onClick={() => {
                          const promise = new Promise((resolve, reject) => {
                            resolve(dispatch(Delete_user(item.id)));
                          });

                          promise.then(() => {
                            swal("User Deleted");
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))}
        </table>
        <button
          className="delete_selected"
          onClick={() => {
            dispatch(Deleted_selected(selectedUser));
            setSelectedUser([]);
          }}
        >
          Delete Selected
        </button>
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
    );
  }
};

export default connect(null, { fetchData })(Content);
