import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
};
