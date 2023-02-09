import { CanActivate, ExecutionContext } from "@nestjs/common";

export default class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false;
        }
        return request.currentUser.admin;
    }
}
