const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('help', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    head: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'help',
    schema: 'public',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "help_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
