const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_category', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_category',
    schema: 'public',
    timestamps: false
  });
};
