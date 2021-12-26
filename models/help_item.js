const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('help_item', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    help_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'help',
        key: 'id'
      }
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
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    links: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'help_item',
    schema: 'public',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "help_item_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
