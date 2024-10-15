const User = require('../../models/User/User');
const Role = require('../../models/Roles/Role');

const userController = {


 async getAllUsers(req, res) {
  try {
    const users = await User.findAll({ 
      where: { role_id: 1 },
      include: [{
        model: Role,
        attributes: ['id', 'role_name'],
      }] 
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
},

  async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, { 
        include: [{
          model: Role,
          attributes: ['id', 'role_name'], // Solo incluye los campos que existen
        }] 
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  },

  async createUser(req, res) {
    try {
        const { username, password, role_id } = req.body;
        const user = await User.create({ username, password, role_id });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creando el usuario:', error); 
        res.status(500).json({ message: 'Error creando el usuario', error });
    }
},


  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { username, password, roleId } = req.body;
      await user.update({ username, password, roleId });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  },
};

module.exports = userController;
