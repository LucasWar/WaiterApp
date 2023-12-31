import { Request, Response } from 'express';
import { io } from '../../..';

import { Order } from '../../models/Order';

export async function createOrder(req:Request, res:Response){
  try{
    const {table, products} = req.body;
    const order = await Order.create({table, products});
    const orderDatails = await order.populate('products.product');

    io.emit('order@new',orderDatails);

    res.status(201).json(order);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}
