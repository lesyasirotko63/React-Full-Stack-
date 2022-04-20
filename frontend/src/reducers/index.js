import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import products from 'reducers/products/productsReducers';

import categories from 'reducers/categories/categoriesReducers';

import orders from 'reducers/orders/ordersReducers';

import reviews from 'reducers/reviews/reviewsReducers';

import promocodes from 'reducers/promocodes/promocodesReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    products,

    categories,

    orders,

    reviews,

    promocodes,
  });
