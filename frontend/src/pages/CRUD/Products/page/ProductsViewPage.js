import React, { useEffect } from 'react';
import ProductsWidget from 'pages/CRUD/Products/page/ProductsWidget';
import actions from 'actions/products/productsFormActions';
import { connect } from 'react-redux';

const ProductsViewPage = (props) => {
  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [match]);

  return (
    <React.Fragment>
      <ProductsWidget loading={loading} record={record} />
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    loading: store.users.form.loading,
    record: store.users.form.record,
  };
}

export default connect(mapStateToProps)(ProductsViewPage);
