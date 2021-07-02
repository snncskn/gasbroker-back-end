const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('media', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: "media_vehicle_unq"
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: "media_company_unq"
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: "media_user_unq"
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
    ref_id: {
      type: DataTypes.JSON,
      allowNull: true
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    company_types_id: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: "media_company_types_id"
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: "media_vehicle_unq"
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
        name: "media_company_types_id",
        unique: true,
        fields: [
          { name: "company_types_id" },
        ]
      },
      {
        name: "media_company_unq",
        unique: true,
        fields: [
          { name: "id" },
          { name: "company_id" },
        ]
      },
      {
        name: "media_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "media_user_unq",
        unique: true,
        fields: [
          { name: "id" },
          { name: "user_id" },
        ]
      },
      {
        name: "media_vehicle_unq",
        unique: true,
        fields: [
          { name: "id" },
          { name: "vehicle_id" },
        ]
      },
    ]
  });
};
