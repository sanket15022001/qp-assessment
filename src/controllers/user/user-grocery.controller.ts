import { Request, Response } from "express";
import { GroceryItem } from "../../interfaces/grocery-item.interface";
import GroceryModel from "../../models/grocery.model";
import { Order } from "../../interfaces/order.interface";

export default class UserGroceryContoller {
  static async orderGrocery(req: Request, res: Response): Promise<void> {
    console.log("req", req.body);

    const orders: Order[] = req.body;

    try {
      const price = await GroceryModel.orderGrocery(orders);
      res.status(200).json({ message: "Grocery ordered successfull, total amount paid : ", price });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ error: errorMessage });
    }


  }
}
