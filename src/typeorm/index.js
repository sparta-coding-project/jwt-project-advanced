import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    type: "mysql",
    url: "mysql://root:1234@172.17.0.2:3306/jwt",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})

dataSource.initialize();