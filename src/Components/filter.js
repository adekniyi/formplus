import React, { useState, useEffect } from 'react';
import Data from '../data';
import CardItem from './CardItem';

export default function Filter() {
  const [datas, setdatas] = useState(Data);
  const [filterData, setfilterData] = useState([]);
  const [getValue, setGetValue] = useState('');

  const filter = datas
    .map(({ category }) => {
      return category;
    })
    // .toString()
    // .split(',')
    // .filter((c, index, self) => {
    //   return self.indexOf(c) == index;
    // })
    .filter((singlecat) => {
      return singlecat.toLowerCase().includes(getValue.toLowerCase());
    });

  const filterCat = filter
    .toString()
    .split(',')
    //.map(lst=>{return lst})
    .filter((singlecat) => {
      return singlecat.toLowerCase().includes(getValue.toLowerCase());
      //setfilterData(singlecat)
    });

  const sort = (value) => {
    // console.log(value)
    if (value == 'Ascending') {
      return filterCat.sort();
    } else if (value == 'Descending') {
      return filterCat.reverse();
    } else {
      return filterCat;
    }
  };
  return (
    <>
      <div className='input'>
        <div className='left-input'>
          <input
            type='text'
            placeholder='search template'
            value={getValue}
            onChange={(e) => setGetValue(e.target.value)}
            className='search-temp'
          />
        </div>
        <div className='right-input'>
          <p>sort by</p>
          <select
            class='custom-select sel1'
            onChange={(e) => setGetValue(e.target.value)}
          >
            <option value=''>All</option>
            <option value='Education'>Education</option>
            <option value='E-commerce'>E-commerce</option>
            <option value='Health'>Health</option>
          </select>
          <select class='custom-select sel2'>
            <option value='0'>Default</option>
            <option value='Ascending'>Ascending</option>
            <option value='Descending'>Descending</option>
          </select>
          <select class='custom-select sel3'>
            <option value='0'>Sort</option>
            <option value='1'>Last updated</option>
          </select>
        </div>
      </div>
    </>
  );
}
