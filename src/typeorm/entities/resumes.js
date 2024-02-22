import { EntitySchema } from "typeorm";

const Status = {
    APPLY: "APPLY",
    DROP: "DROP",
    PASS:'PASS',
    INTERVIEW1:'INTERVIEW1',
    INTERVIEW2:'INTERVIEW2',
    FINAL_PASS:'FINAL_PASS'
}

const Resumes = new EntitySchema({
  name: "Resume",
  tableName: "Resume",
  columns: {
    resumeId: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    userId: {
      // 외래 키 추가
      type: "int",
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "text",
    },
    status:{
        type: "enum",
        enum: Status
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
    user: {
      // 단일 사용자와의 관계
      target: "Users",
      type: "many-to-one", // Resumes 테이블과 Users 테이블 간의 1:N 관계
      joinColumn: {
        name: "userId",
        referencedColumnName: "userId", // 외래 키가 참조하는 Users 테이블의 기본 키
      },
    },
  },
});

export default Resumes