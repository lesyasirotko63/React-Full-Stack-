const reviewsFields = {
  id: { type: 'id', label: 'ID' },

  body: { type: 'string', label: 'Body' },

  rating: { type: 'int', label: 'Rating' },

  product: { type: 'relation_one', label: 'Product' },

  user: { type: 'relation_one', label: 'User' },
};

export default reviewsFields;
