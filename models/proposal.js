const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proposal', {
    id: {
      defaultValue: DataTypes.UUIDV4,
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
      allowNull: false,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'proposal',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
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
