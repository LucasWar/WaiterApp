import { Request, Response } from 'express';

import { Ingredient } from '../../models/Ingredient';

export async function deleteIngredient(req:Request, res:Response){
  try{
    const {ingredientId} = req.params;
    await Ingredient.findByIdAndDelete(ingredientId);
    res.sendStatus(204);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
