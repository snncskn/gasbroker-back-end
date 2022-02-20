const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agreement', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    proposal_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'proposal',
        key: 'id'
      }
    },
    to_message_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'message',
        key: 'id'
      }
    },
    from_message_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'message',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    approval_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    approval_user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'agreement',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "agreement_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
