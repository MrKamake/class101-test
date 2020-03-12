import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

  return (
    <PageNationWrapper>
      <StyledPageNation>
        {items.length !== 0
          ? new Array(pageNum).fill(null).map((_, i) => {
              const page = i + 1;
              return (
                <li
                  className={currentPage === page ? 'active' : 'disabled'}
                  onClick={() => {
                    onChagePage(
                      items.slice(trimNumber * i, trimNumber * i + 5)
                    );
                    setCurrentPage(page);
                    setScrollTop();
                  }}
                  key={i}
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
    color: rgb(27, 28, 29);
    font-weight: 800;
  }
`;

export default PageNation;
