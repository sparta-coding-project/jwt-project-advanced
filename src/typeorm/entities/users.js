import { EntitySchema } from "typeorm";

const Users = new EntitySchema({
  name: "Users",
  tableName: "Users",
  columns: {
    userId: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    username: {
      type: "varchar",
      unique: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    role: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP"
    },
    updatedAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      updateDate: () => "CURRENT_TIMESTAMP"
    },
  },
  relations: {
    resumes: {
      // 사용자와의 관계
      target: "Resume",
      type: "one-to-many", // Users 테이블과 Resumes 테이블 간의 1:N 관계
      inverseSide: "users", // Resumes 엔터티에 정의된 관계의 이름
    },
  },
});

export default Users;
