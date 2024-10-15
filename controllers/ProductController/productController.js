const Product = require('../../models/Products/Product');
const Brand = require('../../models/Brand/Brand');

const productController = {
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({ include: Brand });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving products', error });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, { include: Brand });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving product', error });
    }
  },

  async createProduct(req, res) {
    try {
      const { name, description, image_url, price, brand_id } = req.body;
      const product = await Product.create({ name, description, image_url, price, brand_id });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  },

  async updateProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const { name, description, image_url, price, brand_id } = req.body;
      await product.update({ name, description, image_url, price, brand_id });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  },

  async deleteProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await product.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  },
};

module.exports = productController;
