import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("Authentication System (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/auth/signup (GET)", () => {
        const newemail = `email${Math.floor(Math.random() * 100)}@email.com`;
        return request(app.getHttpServer())
            .post("/auth/signup")
            .send({ email: newemail, password: "123" })
            .expect(201)
            .then((res) => {
                const { email, id } = res.body;
                expect(id).toBeDefined();
                expect(email).toEqual(newemail);
            });
    });
});
