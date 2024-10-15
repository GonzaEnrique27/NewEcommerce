const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
// @ts-ignore
const productController = require('./controllers/ProductController/productController');
// @ts-ignore
const userController = require('./controllers/UserController/userController');
const brandController = require('./controllers/BrandController/brandController');
const roleController = require('./controllers/RoleController/roleController');
const { productValidator, validateProduct } = require('./validators/ProductValidator/productValidator');
const { brandValidator, validateBrand } = require('./validators/BrandValidator/brandValidator');
const { userValidator, validateUser } = require('./validators/UserValidator/userValidator');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.use(bodyParser.json());

sequelize.sync().then(() => {
  console.log('DB connected');
});

// Rutas para CRUD de productos
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.post('/products', productValidator, validateProduct, productController.createProduct);
app.put('/products/:id', productValidator, validateProduct, productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

// Rutas para CRUD de usuarios
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userValidator, validateUser, userController.createUser);
app.put('/users/:id', userValidator, validateUser, userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Rutas para CRUD de marcas
app.get('/brands', brandController.getAllBrands);
app.get('/brands/:id', brandController.getBrandById);
app.post('/createbrands', brandValidator, validateBrand, brandController.createBrand);
app.put('/editbrand/:id', brandValidator, validateBrand, brandController.updateBrand);
app.delete('/deletebrands/:id', brandController.deleteBrand);

// Ruta para traer los roles
app.get('/getRoles', roleController.getAllRoles);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
