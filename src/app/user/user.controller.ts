import { Controller, Get, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    getUser() {
        throw new UnauthorizedException();
    }
}