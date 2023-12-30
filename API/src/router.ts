import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategories } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrder } from './app/useCases/orders/listOrdes';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { deleteCategory } from './app/useCases/categories/deleteCategory';
import { updateCategory } from './app/useCases/categories/updateCategorie';
import { findCategoryById } from './app/useCases/categories/findCategoryById';
import { deleteProduct } from './app/useCases/products/deleteProduct';

import { listIngredient } from './app/useCases/ingredients/listIngredients';
import { createIngredient } from './app/useCases/ingredients/createIngredient';
import { deleteIngredient } from './app/useCases/ingredients/deleteIngredient';
import { updateIngredient } from './app/useCases/ingredients/updateIngredient';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
      callback(null, path.resolve(__dirname,'..','uploads'));
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

//list Categories
router.get('/categories', listCategories);

//create Categoies
router.post('/categories', createCategories);

//find category id
router.get('/categories/:categoryId', findCategoryById);

//delete category
router.delete('/categories/:categoryId',deleteCategory);

//update category
router.patch('/categories/:categoryId',updateCategory);

//list products
router.get('/products',listProducts);

//create products
router.post('/products',upload.single('image'), createProduct);

//list productsByCategory
router.get('/category/:categoryId/products', listProductsByCategory);

//delete product
router.delete('/products/:productId', deleteProduct);

//list orders
router.get('/orders', listOrder);

//create order
router.post('/orders', createOrder);

//
router.patch('/orders/:orderId', changeOrderStatus);

//delete order
router.delete('/orders/:orderId', cancelOrder);

//list ingredients
router.get('/ingredients',listIngredient);

//delete ingredient
router.delete('/ingredients/:ingredientId',deleteIngredient);

//update ingredient
router.patch('/ingredient/:ingredientId',updateIngredient);

//create ingredient
router.post('/ingredient',createIngredient);
