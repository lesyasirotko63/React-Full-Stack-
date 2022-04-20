import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';

const actions = {
  doNew: () => {
    return {
      type: 'PRODUCTS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCTS_FORM_FIND_STARTED',
      });

      axios.get(`/products/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'PRODUCTS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PRODUCTS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/products'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCTS_FORM_CREATE_STARTED',
      });

      axios.post('/products', { data: values }).then((res) => {
        dispatch({
          type: 'PRODUCTS_FORM_CREATE_SUCCESS',
        });

        toast.success('Products created');
        dispatch(push('/admin/products'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PRODUCTS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'PRODUCTS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/products/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'PRODUCTS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('Products updated');
        dispatch(push('/admin/products'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'PRODUCTS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
