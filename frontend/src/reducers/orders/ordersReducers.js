import list from 'reducers/orders/ordersListReducers';
import form from 'reducers/orders/ordersFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
