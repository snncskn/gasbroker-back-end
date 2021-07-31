const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "process_item",
    {
      id: {
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "process",
          key: "id",
        },
      },
      process_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "process_group",
          key: "id",
        },
      },
      group_sub_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "process_sub_group",
          key: "id",
        },
      },
      process_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "process_item",
      schema: "public",
      paranoid: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      indexes: [
        {
          name: "process_item_pk",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
