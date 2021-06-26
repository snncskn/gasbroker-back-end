const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var vehicle = sequelize.define('vehicle', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    registered_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    }
  }, {
    sequelize,
    tableName: 'vehicle',
    schema: 'public',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "vehicle_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  //vehicle.associate = function(models) {
   // vehicle.hasOne(models.company, {foreignKey: 'id', sourceKey: 'company_id'});
  //}
return vehicle;
};
