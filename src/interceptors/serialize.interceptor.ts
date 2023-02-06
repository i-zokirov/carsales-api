import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassContructor {
    new (...args: any[]): {};
}

export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassContructor) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        // Run before request is handled
        // by the request handlers
        // console.log("Running before the handler ");
        // console.log(context);
        return next.handle().pipe(
            map((data: any) => {
                // console.log(`Running before response is sent`);
                // console.log(data);
                const userdto = plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                });
                return userdto;
            })
        );
    }
}
