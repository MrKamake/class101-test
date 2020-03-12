import React from 'react';
import styled from 'styled-components';

const Button = ({ children, onClick, style }) => {
  return (
    <StyledButton onClick={onClick} style={{ ...style }}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
`;

export default Button;
