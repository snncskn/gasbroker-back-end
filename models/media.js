const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('media', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
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
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'media',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "media_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
