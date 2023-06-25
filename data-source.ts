import "reflect-metadata"
import { DataSource } from "typeorm"
// import { Product } from "@db/entity/Product";
// import { Tag } from "@db/entity/Tag";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "221089abcdE%",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: ["src/database/entity/**/*.ts"],
    migrations: [],
    subscribers: [],
})
