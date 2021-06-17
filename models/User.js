const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "user_email_unique"
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "user_username_unique"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    passwordResetToken: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phonenumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    google: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    user_role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    departman_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    tenant_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    familyname: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_email_unique",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "user_username_unique",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
