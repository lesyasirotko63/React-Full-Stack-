const promocodesFields = {
  id: { type: 'id', label: 'ID' },

  code: { type: 'string', label: 'Code' },

  discount: { type: 'decimal', label: 'Discount' },

  products: { type: 'relation_many', label: 'Products' },
};

export default promocodesFields;
