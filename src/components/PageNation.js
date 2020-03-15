import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../styles/colors';
import { PLUS_PAGE_INDEX, TRIM_NUMBER } from '../constants';

const PageNation = ({ numberOfItems, onChagePage }) => {
  const pageNum = Math.ceil(numberOfItems / TRIM_NUMBER);
  const [currentPage, setCurrentPage] = useState(1);

  const setScrollTop = () => {
    const { documentElement, body } = document;
    if (documentElement) documentElement.scrollTop = 0;
    // Safari
    body.scrollTop = 0;
  };

  const handleClickPage = page => {
    onChagePage(page);
    setCurrentPage(page);
    setScrollTop();
  };

  return (
    <PageNationWrapper>
      <StyledPageNation>
        {new Array(pageNum).fill(null).map((_, index) => {
          const page = index + PLUS_PAGE_INDEX;
          const isCurrentPage = currentPage === page;
          return (
            <li
              className={isCurrentPage ? 'active' : null}
              onClick={() => isCurrentPage || handleClickPage(page)}
              key={index}
            >
              {page}
            </li>
          );
        })}
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
