import { AppDataSource } from "../config/database";
import { GroceryItem } from "../interfaces/grocery-item.interface";
import { Grocery } from "../models/grocery.entity";
import { Repository } from "typeorm";

export class GroceryRepository {
    private readonly repo: Repository<Grocery>;

    constructor() {
        this.repo = AppDataSource.getRepository(Grocery);
    }

    async addGrocery(
        name: string,
        quantity: number,
        price: number
    ): Promise<void> {
        await this.repo.upsert({ name, quantity, price }, ["name"]);
    }

    async getAllGroceries(): Promise<Grocery[]> {
        return await this.repo.find();
    }

    async updateGrocery(id: number, data: Partial<Grocery>): Promise<Grocery | null> {
        let groceryItem = await this.repo.findOne({ where: { id } });
        console.log(groceryItem)
        if (!groceryItem) {
            return null;
        }

        groceryItem = { ...groceryItem, ...data };
        return await this.repo.save(groceryItem);
    }

    async deleteGrocery(id: number): Promise<void> {
        await this.repo.delete({ id });
    }

    async updateAll(groceries : GroceryItem[]): Promise<void> {
         await this.repo.save(groceries);
    }
}
