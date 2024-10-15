const Brand = require('../../models/Brand/Brand');

const brandController = {
  async getAllBrands(req, res) {
    try {
      const brands = await Brand.findAll();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving brands', error });
    }
  },

  async getBrandById(req, res) {
    try {
      const brand = await Brand.findByPk(req.params.id);
      if (!brand) return res.status(404).json({ message: 'Brand not found' });
      res.json(brand);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving brand', error });
    }
  },

  async createBrand(req, res) {
    try {
      const { name, logo_url } = req.body;
      const brand = await Brand.create({ name, logo_url });
      res.status(201).json(brand);
    } catch (error) {
      res.status(500).json({ message: 'Error creating brand', error });
    }
  },

  async updateBrand(req, res) {
    try {
      const brand = await Brand.findByPk(req.params.id);
      if (!brand) return res.status(404).json({ message: 'Brand not found' });

      const { name, logo_url } = req.body;
      await brand.update({ name, logo_url });
      res.json(brand);
    } catch (error) {
      res.status(500).json({ message: 'Error updating brand', error });
    }
  },

  async deleteBrand(req, res) {
    try {
      const brand = await Brand.findByPk(req.params.id);
      if (!brand) return res.status(404).json({ message: 'Brand not found' });

      await brand.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting brand', error });
    }
  },
};

module.exports = brandController;
