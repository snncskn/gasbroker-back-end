const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('process_sub_group', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'process_group',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'process_sub_group',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: false,
    timestamps: true,
    indexes: [
      {
        name: "process_sub_group_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
