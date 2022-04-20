import list from 'reducers/products/productsListReducers';
import form from 'reducers/products/productsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
