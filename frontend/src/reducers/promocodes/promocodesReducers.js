import list from 'reducers/promocodes/promocodesListReducers';
import form from 'reducers/promocodes/promocodesFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
