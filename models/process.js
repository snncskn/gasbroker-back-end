const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('process', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    group_sub_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    process_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true
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
    }
  }, {
    sequelize,
    tableName: 'process',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "process_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};