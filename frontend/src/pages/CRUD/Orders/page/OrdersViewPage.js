import React, { useEffect } from 'react';
import OrdersWidget from 'pages/CRUD/Orders/page/OrdersWidget';
import actions from 'actions/orders/ordersFormActions';
import { connect } from 'react-redux';

const OrdersViewPage = (props) => {
  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [match]);

  return (
    <React.Fragment>
      <OrdersWidget loading={loading} record={record} />
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    loading: store.users.form.loading,
    record: store.users.form.record,
  };
}

export default connect(mapStateToProps)(OrdersViewPage);
