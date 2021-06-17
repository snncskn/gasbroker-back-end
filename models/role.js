const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define("role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "role_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};