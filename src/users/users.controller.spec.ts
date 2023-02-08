import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import User from "./user.entity";
import AuthService from "./auth.service";
import { UsersService } from "./users.service";
import { NotFoundException } from "@nestjs/common";

describe("UsersController", () => {
    let controller: UsersController;

    let fakeUserService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;

    beforeEach(async () => {
        fakeUserService = {
            find: (email: string) =>
                Promise.resolve([
                    {
                        id: 3,
                        email,
                        password: "123",
                    } as User,
                ]),
            findOne: (id: number) =>
                Promise.resolve({
                    id,
                    email: "test@email.com",
                    password: "123",
                } as User),
            // remove: () => {},
            // update: () => {},
        };
        fakeAuthService = {
            signin: (email: string, password: string) =>
                Promise.resolve({ id: 1, email, password } as User),
            // signup: () => {},
        };
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
    it("findAllUsers returns users with given email", async () => {
        const users = await controller.findAllUser("test@email.com");
        expect(users.length).toEqual(1);
        expect(users[0].email).toEqual("test@email.com");
    });
    it("findUser returns a single user with the given id", async () => {
        const user = await controller.findUser("1");
        expect(user).toBeDefined();
    });
    it("findUser throws an error if user with given id is not found", async () => {
        fakeUserService.findOne = () => null;
        await expect(controller.findUser("1")).rejects.toThrow(
            NotFoundException
        );
    });

    it("sign in updates session object and returns user", async () => {
        const session = { userId: null };
        const user = await controller.singin(
            { email: "email@test.com", password: "123" },
            session
        );

        expect(user.id).toEqual(1);
        expect(session.userId).toEqual(1);
    });
});
