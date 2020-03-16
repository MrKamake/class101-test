import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/common/Header';

describe('<Header />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  describe('should contain navigation buttons', () => {
    it('products button', () => {
      expect(wrapper.contains(<li>상품</li>)).toBe(true);
    });
    it('cart button', () => {
      expect(wrapper.contains(<li>장바구니</li>)).toBe(true);
    });
  });
});
