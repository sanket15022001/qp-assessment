import express from "express";
import GroceryContoller from "../controllers/admin/admin-grocery.controller";
import UserGroceryContoller from "../controllers/user/user-grocery.controller";

const router = express.Router();

router.post("/addGrocery", GroceryContoller.addGrocery);

router.put("/updateGrocery/:id", GroceryContoller.updateGrocery);

router.get("/getAllGroceries", GroceryContoller.getAllGroceries);

router.delete("/deleteGrocery/:id", GroceryContoller.deleteGrocery);

router.post("/orderGrocery", UserGroceryContoller.orderGrocery)


export default router