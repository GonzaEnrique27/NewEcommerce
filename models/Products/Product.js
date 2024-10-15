const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Brand = require('../Brand/Brand');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true, // Puedes establecer esto como true ya que puede ser nulo
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Brand,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

// Relación con la tabla de Brand
Product.belongsTo(Brand, { foreignKey: 'brand_id' });

module.exports = Product;
