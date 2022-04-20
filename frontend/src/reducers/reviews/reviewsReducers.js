import list from 'reducers/reviews/reviewsListReducers';
import form from 'reducers/reviews/reviewsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
