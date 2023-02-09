import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        if (process.env.NODE_ENV === "development") {
            return {
                type: this.configService.get<any>("DB_TYPE"),
                synchronize: this.configService.get<boolean>("SYNCHRONIZE"),
                database: this.configService.get<string>("DB_NAME"),
                autoLoadEntities: true,
            };
        } else if (process.env.NODE_ENV === "test") {
            return {
                type: this.configService.get<any>("DB_TYPE"),
                synchronize: this.configService.get<boolean>("SYNCHRONIZE"),
                database: this.configService.get<string>("DB_NAME"),
                autoLoadEntities: true,
                migrationsRun:
                    this.configService.get<boolean>("MIGRATIONS_RUN"),
            };
        } else if (process.env.NODE_ENV === "production") {
            return {
                type: this.configService.get<any>("DB_TYPE"),
                synchronize: this.configService.get<boolean>("SYNCHRONIZE"),
                url: process.env.DATABASE_URL,
                autoLoadEntities: true,
                migrationsRun:
                    this.configService.get<boolean>("MIGRATIONS_RUN"),
                ssl: {
                    rejectUnauthorized: this.configService.get<boolean>("SSL"),
                },
                username: this.configService.get<string>("USERNAME"),
                password: this.configService.get<string>("PASSWORD"),
                port: this.configService.get<number>("DB_PORT"),
            };
        }
    }
}
