import React, {useState} from "react";


// import { data_search } from '../redux/actionType';

const Search = ({handleChange}) => {
return (
    <div>
      <input
        placeholder="Search by name, email or role"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
