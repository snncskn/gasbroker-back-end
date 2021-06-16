const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parameter', {
    parameter_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    timestamps: false,
    indexes: [
      {
        name: "parameter_pkey",
        unique: true,
        fields: [
          { name: "parameter_id" },
        ]
      },
    ]
  });
};
