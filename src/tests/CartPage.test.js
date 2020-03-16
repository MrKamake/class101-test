import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../App';
import TestRenderer from 'react-test-renderer';
import CartPage from '../pages/CartPage';
import CartItemViewer from '../components/cart/CartItemViewer';
import ProductItem from '../components/common/ProductItem';
import TotalPrice from '../components/cart/TotalPrice';
import Coupon from '../components/cart/Coupon';

describe('Cart Pgae', () => {
  describe('<CartPage />', () => {
    let cartList;

    beforeEach(() => {
      cartList = React.useState = [];
    });

    afterEach(() => {
      React.useState = cartList;
    });

    it('should contain element', () => {
      const element = new TestRenderer.create(
        (
          <MemoryRouter initialEntries={['/cart']}>
            <CartContext.Provider value={{ cartList }}>
              <CartPage />
            </CartContext.Provider>
          </MemoryRouter>
        )
      );
      expect(element.root.findByType('h2').children).toEqual(['찜한 클래스']);
      expect(element.root.findByType('a').children).toEqual([
        'Class를 찜해주세요 :)'
      ]);
    });
  });

  describe('<CartItemViewer />', () => {
    let wrapper, props;

    beforeEach(() => {
      props = {
        item: {
          product: {
            id: 'B9vUv0E0ibc0X55kVVLr',
            availableCoupon: false
          }
        },
        coupons: [
          {
            type: 'rate',
            title: '10% 할인 쿠폰',
            discountRate: 10
          },
          {
            type: 'amount',
            title: '10,000원 할인 쿠폰',
            discountAmount: 10000
          }
        ],
        toggleItem: jest.fn(),
        onChangeCount: jest.fn(),
        onChangeCoupon: jest.fn(),
        productCard: {
          id: 'B9vUv0E0ibc0X55kVVLr',
          title:
            '포근한 니트로 만드는 나만의 글씨, 봉봉메이드 니트레터링 클래스',
          price: 560000
        }
      };

      wrapper = shallow(<CartItemViewer {...props} />);
    });

    it('should contain elements', () => {
      const inputBox = wrapper.find('input');
      expect(inputBox.length).toBe(2);
      expect(
        wrapper.contains(<option>쿠폰을 사용할 수 없는 제품이에요.</option>)
      ).toBe(true);
    });
  });

  describe('<Coupon />', () => {
    let coupons, wrapper;

    beforeEach(() => {
      coupons = [
        {
          type: 'rate',
          title: '10% 할인 쿠폰',
          discountRate: 10
        },
        {
          type: 'amount',
          title: '10,000원 할인 쿠폰',
          discountAmount: 10000
        }
      ];

      wrapper = shallow(<Coupon coupons={coupons} />);
    });

    it('should contain options of coupon', () => {
      const Button = wrapper.find('option');
      expect(Button.length).toBe(3);
    });
  });

  describe('<TotalPrice />', () => {
    let wrapper, cartList;

    beforeEach(() => {
      cartList = React.useState = [
        {
          product: {
            id: '81x83ysiEHsHCBoeVh2O',
            title: '글씨가 주는 소소한 행복, Lettering Together!',
            coverImage:
              'https://cdn.class101.net/images/ec0f0c15-aeec-43a3-a0c9-b649b0999f0a',
            price: 320000,
            score: 300
          },
          selected: true,
          quantity: 1,
          coupon: { type: 'amount', discount: 10000 }
        }
      ];

      wrapper = new TestRenderer.create(
        (
          <CartContext.Provider value={{ cartList }}>
            <TotalPrice />
          </CartContext.Provider>
        )
      );
    });

    afterEach(() => {
      React.useState = cartList;
    });

    it('should contain element', () => {
      expect(wrapper.root.findByType('h4').children).toEqual(['결제 금액']);
    });

    it('should contain table elements', () => {
      const tableSection = wrapper.root.findByType('table').children;
      expect(tableSection.length).toBe(2);
    });
  });
});
