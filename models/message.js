const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    proposal_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    to_user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    from_user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    unread_count: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0'
    },
    muted: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.DATE
    },
    message_time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.TIME
    }
  }, {
    sequelize,
    tableName: 'message',
    schema: 'public',
    timestamps: false,
  });
};
