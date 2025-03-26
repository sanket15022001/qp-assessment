import { GroceryItem } from "../interfaces/grocery-item.interface";
import { Order } from "../interfaces/order.interface";
import { GroceryRepository } from "../repositories/grocery.repository";
import { Grocery } from "./grocery.entity";

const groceryRepo = new GroceryRepository()
export default class GroceryModel {
    static async addGrocery(data: GroceryItem): Promise<void> {
        await groceryRepo.addGrocery(data.name, data.quantity, data.price)
    }

    static async getAllGroceries() {
        return await groceryRepo.getAllGroceries()
    }

    static async updateGrocery(id: number, data: Partial<GroceryItem>): Promise<Grocery | null> {
        const updatedGrocery = await groceryRepo.updateGrocery(id, data);
        return updatedGrocery;
    }

    static async deleteGrocery(id: number): Promise<void> {
        await groceryRepo.deleteGrocery(id);
    }

    static async orderGrocery(orders: Order[]): Promise<number> {
        let totalCost = 0;

        const groceries = await groceryRepo.getAllGroceries();
    
        for (const order of orders) {
            const index = groceries.findIndex(item => item.name == order.name);

            if(index === -1) {
                throw new Error(`Grocery item '${order.name}' not found`);
            }

            const grocery = groceries[index];
    
            const quantity = order.quantity ?? 1;
    
            if (grocery.quantity < quantity) {
                throw new Error(`Insufficient stock for grocery item '${order.name}'`);
            }
    
            totalCost += grocery.price * quantity;

            grocery.quantity -= quantity;
    
        }
        await groceryRepo.updateAll(groceries);
    
        return totalCost;
    }
    
}