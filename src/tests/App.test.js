import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Header from '../components/common/Header';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

describe('Components', () => {
  describe('should be render according to the route', () => {
    it('/ redirect to /products', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
      expect(wrapper.find(Header)).toHaveLength(1);
      expect(wrapper.find(ProductsPage)).toHaveLength(1);
      expect(wrapper.find(CartPage)).toHaveLength(0);
    });

    it('/cart', () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/cart']}>
          <App />
        </MemoryRouter>
      );
      expect(wrapper.find(Header)).toHaveLength(1);
      expect(wrapper.find(ProductsPage)).toHaveLength(0);
      expect(wrapper.find(CartPage)).toHaveLength(1);
    });
  });
});
