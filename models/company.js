const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tanent_id: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    company_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    full_company_name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    logo_link: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true
    },
    registered_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gtm: {
      type: DataTypes.TIME,
      allowNull: true
    },
    company_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    additional_url: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    employees: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    founded_in: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    legal_form: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vat_uid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dun: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    linkedin: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    youtube: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    industry: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    technology: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    metarial: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    process: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    sector: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'company',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "company_pkey",
        unique: true,
        fields: [
          { name: "company_id" },
        ]
      },
    ]
  });
};