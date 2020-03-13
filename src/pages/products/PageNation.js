import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../../styles/colors';

const PageNation = ({ items, trimNumber, onChagePage }) => {
  const pageNum = Math.ceil(items.length / trimNumber);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onChagePage(items.slice(0, trimNumber));
  }, []);

  const setScrollTop = () => {
    const { documentElement, body } = document;
    if (documentElement) documentElement.scrollTop = 0;
    // Safari
    body.scrollTop = 0;
  };

  const handleClickPage = (page, index) => {
    onChagePage(items.slice(trimNumber * index, trimNumber * index + 5));
    setCurrentPage(page);
    setScrollTop();
  };

  return (
    <PageNationWrapper>
      <StyledPageNation>
        {items.length !== 0
          ? new Array(pageNum).fill(null).map((_, index) => {
              const page = index + 1;
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
  items: [],
  trimNumber: 5
};

PageNation.propTypes = {
  items: PropTypes.array,
  trimNumber: PropTypes.number,
  onChagePage: PropTypes.func.isRequired
};

const PageNationWrapper = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const StyledPageNation = styled.ul`
  margin: 30px 0px;
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
