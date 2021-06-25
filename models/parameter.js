const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parameter', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lang_id: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    char_value: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    int_value: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    float_value: {
      type: DataTypes.REAL,
      allowNull: true
    },
    bool_value: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    json_value: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'parameter',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "parameter_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
