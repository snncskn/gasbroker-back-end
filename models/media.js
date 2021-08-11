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
      references: {
        model: 'company',
        key: 'id'
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      },
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
    path: {
      type: DataTypes.JSON,
      allowNull: false
    },
    ref_id: {
      type: DataTypes.JSON,
      allowNull: true
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    vehicle_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'vehicle',
        key: 'id'
      },
      unique: "media_vehicle_unq"
    },
    proposal_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'proposal',
        key: 'id'
      },
      unique: "media_proposal_unq"
    },
  }, {
    sequelize,
    tableName: 'media',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: false,
    timestamps: true,
    indexes: [
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
      {
        name: "media_proposal_unq",
        unique: true,
        fields: [
          { name: "id" },
          { name: "proposal_id" },
        ]
      },
    ]
  });
};
