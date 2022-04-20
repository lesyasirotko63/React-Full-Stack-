import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'PROMOCODES_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROMOCODES_FORM_FIND_STARTED',
      });

      axios.get(`/promocodes/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PROMOCODES_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROMOCODES_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/promocodes'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PROMOCODES_FORM_CREATE_STARTED',
      });

      axios.post('/promocodes', { data: values }).then((res) => {
        dispatch({
          type: 'PROMOCODES_FORM_CREATE_SUCCESS',
        });

        toast.success('Promocodes created');
        dispatch(push('/admin/promocodes'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROMOCODES_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PROMOCODES_FORM_UPDATE_STARTED',
      });

      await axios.put(`/promocodes/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PROMOCODES_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Promocodes updated');
        dispatch(push('/admin/promocodes'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PROMOCODES_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
