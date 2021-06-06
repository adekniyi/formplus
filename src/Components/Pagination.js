import React from 'react';

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  action,
  data,
  page,
  currentPage,
}) => {
  const pageNumber = [];

  const handleNavigation = () => {
    action(
      data.slice(
        postsPerPage * currentPage,
        postsPerPage * currentPage + postsPerPage
      )
    );
    let cp = currentPage + 1;
    page(cp);
  };

  const handlePrev = () => {
    action(
      data.slice(
        postsPerPage * (currentPage - 1),
        postsPerPage * currentPage + postsPerPage
      )
    );
    let cp = currentPage - 1;
    page(cp);
  }

  return (
    <nav>
      <ul className='flex-space-btw'>
        <div>
        { currentPage >= 2 && <p onClick={handlePrev}>Prev</p>}
        </div>
        <div>
          <span>{currentPage}</span> of {(data.length/postsPerPage).toFixed()}
        </div>
        <p onClick={handleNavigation}>Next</p>
      </ul>
    </nav>
  );
};

export default Pagination;
