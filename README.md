<img src="./src/images/logo.png" width="500" >

> ## Contents

- [Introduction](#Introduction)

- [Installation](#Installation)

- [Features](#Features)

- [Approach](#Approach)

- [Project Structure](#Project-Structure)

- [Learning points](#Learning-points)

> ### Introduction

- 클래스 상품목록과 장바구니를 볼 수 있는 SPA구성의 웹 어플리케이션.

- 클래스를 장바구니에 담을 수 있고 장바구니에서 결제금액을 확인 할 수 있습니다.

- Header Navigation

  <img src="./src/images/class101-simulation(Header).gif" width="1000">

- Products Page

  <img src="./src/images/class101-simulation(Product_page).gif" width="1000">

- Cart Page

  <img src="./src/images/class101-simulation(Cart_page).gif" width="1000">

> ### Installation

```
$git clone https://github.com/MrKamake/class101-test.git

$cd class101-test

$yarn install

$yarn start
```

> ### Features

- 페이지네이션 기능으로 상품을 5개씩 볼 수 있습니다.

- 사용자가 선택한 상품들을 장바구니에 최대 3개까지 추가하고 삭제할 수 있습니다.

- 사용자가 선택한 상품들을 전체 리스트에서도 확인할 수 있습니다.

- 장바구니 페이지에서 결제할 상품을 선택, 수량, 쿠폰 선택을 할 수 있습니다.

- 장바구니 페이지에서 결제 금액을 알 수 있습니다.

> ### Approach

1. Mock Data를 실제 Api를 호출해서 가져오는 것과 유사하게 로직을 구현해서 상품들을 랜더링했습니다.

```js
import productItems from './../mock-data/productItems';
import coupons from './../mock-data/coupons';
const data = { coupons, productItems };

const getDataApi = (dataName) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data[dataName]);
    }, 1500);
  });
```

2. Score 기준으로 내림차순 정렬시키는 기능은 `Array.prototype.reduce()`를 활용해서 productItems를 재정렬해서 구현했습니다.

```js
const [productItems, setProductItems] = useState([]);

useEffect(() => {
  getDataApi('productItems').then((res) => {
    res.sort((a, b) => b.score - a.score);
    setProductItems(res);
  });
}, []);
```

> ### Project Structure

#### 1) **유지보수와 확장 용이성**

- 재사용할 수 있고 향후 유지보수하는 것에 어려움이 없지 않도록 컴포넌트를 만들었습니다. 책임분리와 적절한 의존성을 고민하며 컴포넌트들의 전반적인 구조를 고민했습니다.

#### 2) React Router

```js
// 초기 랜더링 될때 Redirect를 사용해서 Path를 "/products"으로 변경해서 명확한 주소로 사용자가 알아 볼 수 있도록 구현했습니다.
<Route exact path="/" render={() => <Redirect to="/products" />} />
<Route path="/products" component={Products} />

// 장바구니 페이지 랜더링
<Route path="/cart" component={Cart} />
```

#### 3) Context를 이용한 상태관리

##### - Global State

```js
import React, { createContext } from 'react';

export const CartContext = createContext();

const App = () => {
  const [cartList, setCartList] = useState([]);

  return (
    <CartContext.Provider value={{ cartList, setCartList }}>
      <Component />
    </CartContext.Provider>
  );
};
```
