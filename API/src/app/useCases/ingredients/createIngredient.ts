import { Request, Response } from 'express';

import { Ingredient } from '../../models/Ingredient';

export async function createIngredient(req:Request, res:Response){
  try{
    const {icon, name} = req.body;
    const ingredient = await Ingredient.create({icon, name});
    res.json(ingredient);
  } catch {
    res.sendStatus(500);
  }
}
