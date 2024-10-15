const Role = require('../../models/Roles/Role');

const roleController = {
  async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving roles', error });
    }
  },
};

module.exports = roleController;
