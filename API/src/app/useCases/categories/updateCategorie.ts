import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function updateCategory(req:Request, res:Response){
  try{
    const { categoryId } = req.params;
    const { icon,name } = req.body;
    const update = {
      icon: icon,
      name: name,
    };
    await Category.findByIdAndUpdate(categoryId,  update);
    res.sendStatus(204);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
