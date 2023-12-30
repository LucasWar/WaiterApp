import { Request, Response } from 'express';

import { Ingredient } from '../../models/Ingredient';

export async function updateIngredient(req:Request, res:Response){
  try{
    const { ingredientId } = req.params;
    const { icon,name } = req.body;
    const update = {
      icon: icon,
      name: name,
    };
    await Ingredient.findByIdAndUpdate(ingredientId,  update);
    res.sendStatus(204);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
