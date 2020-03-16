import React, { useState, createContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/common/Header';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

export const CartContext = createContext();

const App = () => {
  const [cartList, setCartList] = useState([]);

  return (
    <CartContext.Provider value={{ cartList, setCartList }}>
      <GlobalStyle />
      <Header />
      <Route exact path="/" render={() => <Redirect to="/products" />} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/cart" component={CartPage} />
    </CartContext.Provider>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export default App;
