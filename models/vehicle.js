const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
  company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "vehicle_un"
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    registered_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    imo_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'vehicle',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: false,
    timestamps: true,
    indexes: [
      {
        name: "vehicle_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "vehicle_un",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
