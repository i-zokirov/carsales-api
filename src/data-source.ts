import { DataSource, DataSourceOptions } from "typeorm";

export const appDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: ["**/*.entity.js"],
    migrations: [__dirname + "migrations/*.js"],
} as DataSourceOptions);
