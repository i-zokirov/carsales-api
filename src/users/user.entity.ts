import {
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

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
