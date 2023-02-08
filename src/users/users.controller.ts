import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    Param,
    Query,
    NotFoundException,
    Session,
    UseGuards,
} from "@nestjs/common";
import { Serialize } from "../interceptors/serialize.interceptor";
import AuthService from "./auth.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import UserDto from "./dtos/user.dto";
import { UsersService } from "./users.service";
import CurrentUser from "./decorators/currentUser.decorator";
import User from "./user.entity";
import AuthGuard from "../guards/auth.guard";

@Controller("auth")
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Get("/whoami")
    @UseGuards(AuthGuard)
    whoami(@CurrentUser() user: User) {
        return user;
    }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post("/signout")
    signOut(@Session() session: any) {
        session.userId = null;
    }
    @Post("/signin")
    async singin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    @Get("/:id")
    async findUser(@Param("id") id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    @Get()
    findAllUser(@Query("email") email: string) {
        return this.userService.find(email);
    }

    @Delete("/:id")
    deleteUser(@Param("id") id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }
}
