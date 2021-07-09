const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proposal', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    last_offer_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    product_detail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    product_quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    freight_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'proposal',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "proposal_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
