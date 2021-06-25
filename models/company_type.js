const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company_type', {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
    }
  }, {
    sequelize,
    tableName: 'company_type',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true
  });
};
