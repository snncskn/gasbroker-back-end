const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('email', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    request: {
      type: DataTypes.JSON,
      allowNull: true
    },
    response: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'email',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "email_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
