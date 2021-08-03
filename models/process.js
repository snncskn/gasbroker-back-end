const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('process', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'proposal',
        key: 'id'
      }
    },
    proposal_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    voyage_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vendor_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    recipient_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    broker_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    captain_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    agency_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    loading_master_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
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
    tableName: 'process',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "process_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
