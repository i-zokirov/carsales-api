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
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
    constructor(private userService: UsersService) {}
    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        this.userService.create(body.email, body.password);
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
