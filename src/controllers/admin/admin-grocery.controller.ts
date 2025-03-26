import { Request, Response } from "express";
import { GroceryItem } from "../../interfaces/grocery-item.interface";
import GroceryModel from "../../models/grocery.model";

export default class GroceryContoller {
  static async addGrocery(req: Request, res: Response): Promise<void> {
    console.log("req", req.body);

    const { name, quantity, price }: GroceryItem = req.body;

    if (!name || !quantity || !price) {
      res.status(400).json({ error: "Missing fields" });
    }

    await GroceryModel.addGrocery({ name, quantity, price });

    res.status(200).json({ message: "Grocery added successfully" });
  }

  static async getAllGroceries(req: Request, res: Response): Promise<void> {
    const groceries = await GroceryModel.getAllGroceries();
    res.status(200).json(groceries);
  }

  static async updateGrocery(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const updateFields = req.body;
    const updatedGrocery = await GroceryModel.updateGrocery(
      Number(id),
      updateFields
    );
    if (!updatedGrocery) {
      res.status(404).json({ error: "Grocery not found" });
    }

    res.status(200).json(updatedGrocery);
  }

  static async deleteGrocery(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    await GroceryModel.deleteGrocery(Number(id));
    res.status(200).json({ message: "Grocery deleted successfully" });
  }
}
