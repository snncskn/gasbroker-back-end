const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('media', {
    media_id: {
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
    title: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    video_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    ref: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    file: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'media',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "media_pkey",
        unique: true,
        fields: [
          { name: "media_id" },
        ]
      },
    ]
  });
};
