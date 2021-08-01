const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "address_un"
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    validate: {
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error('Either both latitude and longitude, or neither!');
        }
      },
    },
    tableName: 'address',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "address_un",
        unique: true,
        fields: [
          { name: "title" },
        ]
      },
      {
        name: "company_address_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
