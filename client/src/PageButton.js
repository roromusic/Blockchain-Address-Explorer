import React from 'react';

const PageButton = ({text, changePage, selected}) => {
  return (
    <li className={`pagination_button ${selected ? 'pagination_button_selected' : undefined}`} onClick={changePage}>
      {text}
    </li>
  );
};

export default PageButton;