import React from 'react';
import { shallow } from 'enzyme';
import { CartContext } from '../App';
import TestRenderer from 'react-test-renderer';
import ProductsPage from '../pages/ProductsPage';
import ProductItem from '../components/common/ProductItem';
import PageNation from '../components/product/PageNation';

describe('Products Pgae', () => {
  describe('<ProductsPage />', () => {
    let cartList, setCartList;

    beforeEach(() => {
      cartList = React.useState;
      setCartList = React.useState = jest.fn();
    });

    afterEach(() => {
      React.useState = cartList;
    });

    it('should contain element', () => {
      const element = new TestRenderer.create(
        (
          <CartContext.Provider value={{ cartList, setCartList }}>
            <ProductsPage />
          </CartContext.Provider>
        )
      );
      expect(element.root.findByType('h2').children).toEqual(['인기 클래스']);
    });
  });

  describe('<ProductItem />', () => {
    let wrapper, props;

    beforeEach(() => {
      props = {
        product: {
          id: 'B9vUv0E0ibc0X55kVVLr',
          title:
            '포근한 니트로 만드는 나만의 글씨, 봉봉메이드 니트레터링 클래스',
          price: 560000
        }
      };

      wrapper = new TestRenderer.create((<ProductItem {...props} />));
    });

    it('should contain elements of productItem', () => {
      expect(wrapper.root.findByType('title').children).toEqual([
        '포근한 니트로 만드는 나만의 글씨, 봉봉메이드 니트레터링 클래스'
      ]);
      expect(wrapper.root.findByType('p').children).toEqual(['560,000', '원']);
    });
  });

  describe('<PageNation />', () => {
    let wrapper, numberOfItems, onChagePage;

    beforeEach(() => {
      numberOfItems = 12;
      onChagePage = jest.fn();

      wrapper = shallow(
        <PageNation numberOfItems={numberOfItems} onChagePage={onChagePage} />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('should contain page buttons', () => {
      it('unclickable page button', () => {
        const pageNumverButton = wrapper.find('.active');
        expect(pageNumverButton.length).toBe(1);
        let clickEvent = () => {
          pageNumverButton.simulate('click');
        };
        expect(clickEvent).not.toThrow();
        expect(onChagePage.mock.calls.length).toEqual(0);
      });

      it('clickable page buttons', () => {
        const pageNumverButtons = wrapper.find('li');
        expect(pageNumverButtons.length).toBe(3);
      });
    });
  });
});
