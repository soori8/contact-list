import React from 'react';
import './style.css';
const SearchBar=({searchHandler,addContactHandler})=>{
    return(
      <div className="form-sec">
        <input
          className="search-bar"
          type="text"
          placeholder="Search name or phone number ..."
          onChange={(e)=>searchHandler(e.target.value)}/>
        <button className="add-contact" onClick={addContactHandler}>
          <i className="glyphicon glyphicon-plus"></i>
        </button>
      </div>
    )
}
export default SearchBar;
