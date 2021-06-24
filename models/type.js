const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
