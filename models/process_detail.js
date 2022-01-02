const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('process_detail', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    process_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'process',
        key: 'id'
      }
    },
    group_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'process_group',
        key: 'id'
      }
    },
    group_sub_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'process_sub_group',
        key: 'id'
      }
    },
    captain_process_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    agency_process_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lm_process_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    captain_media_path: {
      type: DataTypes.JSON,
      allowNull: true
    },
    agency_media_path: {
      type: DataTypes.JSON,
      allowNull: true
    },
    lm_media_path: {
      type: DataTypes.JSON,
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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'process_detail',
    schema: 'public',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "process_detail_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
