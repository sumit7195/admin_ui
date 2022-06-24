import {
  fetch_all_data,
  data_loading,
  error_loading,
  delete_user,
  update_user,
  delete_selected,
  // select_item,
} from "./actionType";

export const fetch_data = (data) => {
  return {
    type: fetch_all_data,
    payload: data,
    error: false,
  };
};

export const Data_loading = (data) => {
  return {
    type: data_loading,
    loading: true,
  };
};

export const Error_loading = (error) => {
  return {
    type: error_loading,
    payload: error,
  };
};



export const Delete_user = (data) => {
  return {
    type: delete_user,
    payload: data,
  };
};

export const Update_user = (data) => {
  return {
    type: update_user,
    payload: data,
  };
};

export const Deleted_selected = (data) => {
  return {
    type: delete_selected,
    payload: data,
  };
};

export const Delete_all = (data) => {};

// export const Select_item = (id) => {
//   // console.log(id)
//   return {
//     type: select_item,
//     payload: id,
//   };
// };
