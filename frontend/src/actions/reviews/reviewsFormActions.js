import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'REVIEWS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'REVIEWS_FORM_FIND_STARTED',
      });

      axios.get(`/reviews/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'REVIEWS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'REVIEWS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/reviews'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'REVIEWS_FORM_CREATE_STARTED',
      });

      axios.post('/reviews', { data: values }).then((res) => {
        dispatch({
          type: 'REVIEWS_FORM_CREATE_SUCCESS',
        });

        toast.success('Reviews created');
        dispatch(push('/admin/reviews'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'REVIEWS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'REVIEWS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/reviews/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'REVIEWS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Reviews updated');
        dispatch(push('/admin/reviews'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'REVIEWS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
