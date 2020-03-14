import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../styles/colors';
import {
  PLUS_PAGE_INDEX,
  TRIM_NUMBER,
  NUMBER_OF_ITEMS
} from '../constants';

const PageNation = ({ items, onChagePage }) => {
  const pageNum = Math.ceil(items.length / TRIM_NUMBER);
  const [currentPage, setCurrentPage] = useState(1);

  const setScrollTop = () => {
    const { documentElement, body } = document;
    if (documentElement) documentElement.scrollTop = 0;
    // Safari
    body.scrollTop = 0;
  };

  const handleClickPage = (page, index) => {
    const startSliceNumber = TRIM_NUMBER * index;
    onChagePage(
      items.slice(startSliceNumber, startSliceNumber + NUMBER_OF_ITEMS)
    );
    setCurrentPage(page);
    setScrollTop();
  };

  return (
    <PageNationWrapper>
      <StyledPageNation>
        {items.length !== 0
          ? new Array(pageNum).fill(null).map((_, index) => {
              const page = index + PLUS_PAGE_INDEX;
              return (
                <li
                  className={currentPage === page ? 'active' : null}
                  onClick={() =>
                    currentPage === page || handleClickPage(page, index)
                  }
                  key={index}
                >
                  {page}
                </li>
              );
            })
          : null}
      </StyledPageNation>
    </PageNationWrapper>
  );
};

PageNation.defaultProps = {
  items: []
};

PageNation.propTypes = {
  items: PropTypes.array,
  onChagePage: PropTypes.func.isRequired
};

const PageNationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 1% 0 3%;
  width: 100%;
  text-align: center;
  background-color: ${colors.white};
`;

const StyledPageNation = styled.ul`
  margin: 0;
  padding-left: 0px;
  li {
    display: inline-block;
    margin: 0 1%;
    width: 30px;
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
  }
  .active {
    border-bottom: 3px solid black;
    color: ${colors.classBlack};
    font-weight: 800;
    cursor: default;
  }
`;

export default PageNation;
