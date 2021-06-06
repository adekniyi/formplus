import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import Pagination from './Pagination';
import Filter from './filter'

export default function Card() {
  const [sections, setSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [filterData, setFilter] = useState([]);

  useEffect(() => {
    setFilter(sections.slice(0, postsPerPage));
  }, [sections]);

  const proxy = 'https://lit-caverns-50090.herokuapp.com/';
  useEffect(() => {
    fetch(
      `${proxy}https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates`
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setSections(data);
      })
      .catch((err) => console.log(`cannot fetch data ${err}`));
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    const filteredResult = sections.filter(({ category }) => {
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
    setFilter(filteredResult);
  };

  const sortByDate = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    const filteredResult = sections.sort(function (a, b) {
      var dateA = new Date(a.created),
        dateB = new Date(b.created);
      if (value.toLowerCase() === 'ascending') {
        return dateA - dateB;
      } else if (value.toLowerCase() === 'descending') {
        return dateB - dateA;
      } else {
        return;
      }
    });
    console.log(filteredResult);
    setFilter(filteredResult);
  };

  const sortByCategory = (e) => {
    const { name, value } = e.target;
    e.preventDefault();

    const filteredResult = sections.filter(({ category }) => {
      if (value.toLowerCase() === 'ascending') {
        return category.sort();
      } else if (value.toLowerCase() === 'descending') {
        return category.reverse();
      } else {
        return category;
      }
    });
    setFilter(filteredResult);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filterData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <Filter inputChange={inputChange} handleOnChange={handleOnChange} sortByCategory={sortByCategory} sortByDate={sortByDate}/>
      <div className='note'>
        <p>
          Tada! Get started with a free template. Can’t find what you are
          looking for? Search from the 1000+ available templates
        </p>
      </div>
      <div className='card'>
        {filterData?.map(({ category, description, created }, index) => (
          <CardItem
          index={index}
            key={created}
            created={created}
            category={category}
            description={description}
          />
        ))}
      </div>
      <Pagination page={setCurrentPage} data={sections} currentPage={currentPage} postsPerPage={postsPerPage} action={setFilter} totalPosts={filterData.length} paginate={paginate}/>
    </>
  );
}
