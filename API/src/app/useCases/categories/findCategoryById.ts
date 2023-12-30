import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function findCategoryById(req:Request, res:Response){
  try{
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    res.json(category);

  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }

}
