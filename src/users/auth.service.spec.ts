import { Test } from "@nestjs/testing";
import AuthService from "./auth.service";
import User from "./user.entity";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AuthService", () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;
    beforeEach(async () => {
        const users: User[] = [];
        // Fake copy of the users service
        fakeUserService = {
            find: (email: string) => {
                const filteredUsers = users.filter(
                    (user) => user.email === email
                );
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user: User = {
                    id: Math.floor(Math.random() * 999),
                    email,
                    password,
                } as User;
                users.push(user);
                return Promise.resolve(user);
            },
        };
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it("can create an instance of auth service", async () => {
        expect(service).toBeDefined();
    });
    it("can create a new user with salted and hashed password", async () => {
        const user = await service.signup("test@email.com", "123");
        expect(user.password).not.toEqual("123");
        const [salt, hash] = user.password.split(".");
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });
    it("throws error if user signs up with email already in use", async () => {
        await service.signup("asdf@asdf.com", "asdf");
        await expect(service.signup("asdf@asdf.com", "asdf")).rejects.toThrow(
            BadRequestException
        );
    });

    it("throws if sigin is called with an unused email", async () => {
        await expect(
            service.signin("laskdjf@alskdfj.com", "passowrd")
        ).rejects.toThrow(NotFoundException);
    });

    it("throws if an invalid password is provided", async () => {
        await service.signup("laskdjf@alskdfj.com", "password");
        await expect(
            service.signin("laskdjf@alskdfj.com", "laksdlfkj")
        ).rejects.toThrow(BadRequestException);
    });

    it("returns a user if correct password is provided", async () => {
        await service.signup("asdf@asdf.com", "password");
        const user = await service.signin("asdf@asdf.com", "password");
        expect(user).toBeDefined();
    });
});
