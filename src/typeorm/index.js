import { DataSource } from "typeorm"
import config from '../../ormconfig.json' assert{ type: "json"};

export const dataSource = new DataSource(config);

export const connectDB = async () => {
    await dataSource.initialize()
    .then(() => console.log('mysql 연결 완료'));
}

export const disconnectDB = async () => {
    await dataSource.destroy()
    .then(() => console.log('mysql 연결 해제'))
}
