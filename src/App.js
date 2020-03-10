import React, { useState, createContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Products from './pages/products';
import Cart from './pages/cart';

export const CartContext = createContext();

const App = () => {
  const [cartList, setCartList] = useState([]);
  const globalState = { cartList, setCartList };

  return (
    <CartContext.Provider value={globalState}>
      <Header />
      <StyledApp>
        <Route exact path="/" render={() => <Redirect to="/products" />} />
        <Route path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
      </StyledApp>
    </CartContext.Provider>
  );
};

const StyledApp = styled.div`
  padding: 0 15% 0 15%;
`;

export default App;
