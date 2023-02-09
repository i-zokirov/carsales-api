import {
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import Report from "../reports/report.entity";
@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log(`Inserted User with an ID: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Update User with an ID: ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Remove User with an ID: ${this.id}`);
    }
}
