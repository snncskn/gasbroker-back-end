const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle', {
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'company',
        key: 'company_id'
      }
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    registered_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    }
  }, {
    sequelize,
    tableName: 'vehicle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "vehicle_pkey",
        unique: true,
        fields: [
          { name: "vehicle_id" },
        ]
      },
    ]
  });
};
