import { Request, Response } from 'express';

import { Ingredient } from '../../models/Ingredient';

export async function listIngredient(req:Request, res:Response){
  try{
    const ingredeint = await Ingredient.find();
    res.json(ingredeint);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }

}
