import React, { useEffect } from 'react';
import PromocodesWidget from 'pages/CRUD/Promocodes/page/PromocodesWidget';
import actions from 'actions/promocodes/promocodesFormActions';
import { connect } from 'react-redux';

const PromocodesViewPage = (props) => {
  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [match]);

  return (
    <React.Fragment>
      <PromocodesWidget loading={loading} record={record} />
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    loading: store.users.form.loading,
    record: store.users.form.record,
  };
}

export default connect(mapStateToProps)(PromocodesViewPage);
