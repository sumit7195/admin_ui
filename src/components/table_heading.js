import React from 'react';
import Content from './content';
import Search from './search';
import { useState } from 'react';
import "./tableHeading.css"
const TableHeading = () => {

const [state, setState] = useState('');

   

  const handleChange = (e) => {
    setState(e.target.value);
  };

return (
      <>
        <table className='main_table'>
          <Search handleChange={handleChange} />
          
          <Content   search={state} />
        </table>
      </>
    );
}

export default TableHeading;
