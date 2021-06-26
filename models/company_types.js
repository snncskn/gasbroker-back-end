const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company_types', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'type',
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
  }, {
    sequelize,
    tableName: 'company_types',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "company_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
