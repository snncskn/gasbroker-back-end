const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'address',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "company_address_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
