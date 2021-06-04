import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import Pagination from './Pagination';

export default function Card() {
  const [sections, setSections] = useState([]);
  //const [getValue, setGetValue] = useState("")
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(50);
  const [filter, setFilter] = useState([]);
  // const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(sections);
  }, [sections]);

  const proxy = 'https://lit-caverns-50090.herokuapp.com/';
  useEffect(() => {
    fetch(
      `${proxy}https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates`
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setSections(data.slice(0, 2000));
      })
      .catch((err) => console.log(`cannot fetch data ${err}`));
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    //console.log('hello world');
    const filteredResult = sections.filter(({ category }) => {
      //console.log(category);
      return category.some((cat) => cat.toLowerCase() === value.toLowerCase());
    });
    setFilter(filteredResult);
  };
  const inputChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    const filteredResult = sections.filter(({ category }) => {
      return category.some((cat) =>
        cat.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(filteredResult);
    setFilter(filteredResult);
  };

  const sortByDate = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    const filteredResult = sections.sort(function (a, b) {
      var dateA = new Date(a.created),
        dateB = new Date(b.created);
        if(value.toLowerCase() === "ascending")
        {
          return dateA - dateB;
        }
        else if(value.toLowerCase() === "descending")
        {
          return dateB - dateA;
        }
        else{
          return
        }
    });
     console.log(filteredResult);
     setFilter(filteredResult);
  };

  const sortByCategory = (e) => {
    const { name, value } = e.target;
    e.preventDefault();

    const filteredResult = sections.filter(({ category }) => {

      if(value.toLowerCase() === "ascending")
      {
        return category.sort()
      }
      else if(value.toLowerCase() === "descending")
      {
        return category.reverse()
      }
      else{
        return category
      }
    });
    console.log(filteredResult);
    setFilter(filteredResult);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filter.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
      <div className="note">
        <p>Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates</p>
      </div>
      <div className='card'>
        {currentPosts.map(({ category, description, created }) => (
          <CardItem
            key={created}
            created={created}
            category={category}
            description={description}
          />
        ))}
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts={sections.length} paginate={paginate}/>
    </>
  );
}
