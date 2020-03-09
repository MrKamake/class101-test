import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Products from './pages/products';
import Cart from './pages/cart';

const App = () => {
  return (
    <>
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/products" />} />
        <Route path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
      </div>
    </>
  );
};

export default App;
