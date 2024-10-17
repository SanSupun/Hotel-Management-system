import express from 'express';
import {createCategoryItems, deleteCategoryItems, getCategories, getCategoryByName, updateCategoryByName, } from '../controllers/categoryItemController.js'

const categoryRouter = express.Router();

categoryRouter.post("/",createCategoryItems)

categoryRouter.delete("/:name", deleteCategoryItems)

categoryRouter.get("/", getCategories)

categoryRouter.get("/:name", getCategoryByName)

//test commits
categoryRouter.put("/:name", updateCategoryByName)


export default categoryRouter; 