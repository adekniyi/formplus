import React, { useState, useEffect } from 'react';
import Data from '../data';
import CardItem from './CardItem';

export default function Filter({inputChange,handleOnChange,sortByCategory,sortByDate}) {

  return (
    <>
       <div className='input'>
        <div className='left-input'>
          <input
            type='text'
            placeholder='search template'
            className='search-temp'
            onChange={inputChange}
          />
        </div>
        <div className='right-input'>
          <p>sort by</p>
          <select onChange={handleOnChange} class='custom-select sel1'>
            <option value='hello'>All</option>
            <option value='Education'>Education</option>
            <option value='E-commerce'>E-commerce</option>
            <option value='Health'>Health</option>
          </select>
          <select class='custom-select sel2' onChange={sortByCategory}>
            <option value='Default'>Default</option>
            <option value='Ascending'>Ascending</option>
            <option value='Descending'>Descending</option>
          </select>
          <select class='custom-select sel3' onChange={sortByDate}>
            <option value='Default'>Default</option>
            <option value='Ascending'>Ascending</option>
            <option value='Descending'>Descending</option>
          </select>
        </div>
      </div>
    </>
  );
}
