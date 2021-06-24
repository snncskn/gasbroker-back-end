const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_category_property', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product_category_property',
    schema: 'public',
    timestamps: false
  });
};
