import React from 'react';
import PageButton from './PageButton';
import './Pagination.css';

const Pagination = ({page, n_tx, changePage}) => {
  const last = Math.ceil(n_tx / 50);
  let pages;

  if(last < 10) {
    pages = getPages(1, last);

  }else {
    if(page < 5) {
      pages = getPages(1, 9);

    }else if(page > last - 4) {
      pages = getPages(last - 8, last)

    }else {
      pages = getPages(page - 4, page + 4);

    }
  }

  function getPages(start, max) {
    const pages = [];
    for (let i = start; i <= max; i++) {
      pages.push(<PageButton key={i} text={i} changePage={() => changePage(i)} selected={i === page}/>);
    }

    return pages;
  }

  return (
    <div className='pagination'>
      <ul className='pagination_buttons'>
        <PageButton text={'Previous'} changePage={() => changePage(page === 1 ? 1 : page - 1)}/>
        {page > 5 ? <PageButton text={'1...'} changePage={() => changePage(1)}/> : undefined}
        {pages}
        {page < last - 4 ? <PageButton text={`...${last}`} changePage={() => changePage(last)}/> : undefined}
        <PageButton text={'Next'} changePage={() => changePage(page === last ? last : page + 1)}/>
        
      </ul>
    </div>
  );
};

export default Pagination;