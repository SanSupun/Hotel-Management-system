import express from 'express';
import {createCategoryItems, deleteCategoryItems, getCategories, getCategoryByName, updateCategory } from '../controllers/categoryItemController.js'

const categoryRouter = express.Router();

categoryRouter.post("/",createCategoryItems)

categoryRouter.delete("/:name", deleteCategoryItems)

categoryRouter.get("/", getCategories)

categoryRouter.get("/:name", getCategoryByName)

//test commits
categoryRouter.put("/:name", updateCategory)


export default categoryRouter; 