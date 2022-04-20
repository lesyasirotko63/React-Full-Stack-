import React, { useEffect } from 'react';
import ReviewsWidget from 'pages/CRUD/Reviews/page/ReviewsWidget';
import actions from 'actions/reviews/reviewsFormActions';
import { connect } from 'react-redux';

const ReviewsViewPage = (props) => {
  const { dispatch, match, loading, record } = props;

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [match]);

  return (
    <React.Fragment>
      <ReviewsWidget loading={loading} record={record} />
    </React.Fragment>
  );
};

function mapStateToProps(store) {
  return {
    loading: store.users.form.loading,
    record: store.users.form.record,
  };
}

export default connect(mapStateToProps)(ReviewsViewPage);
