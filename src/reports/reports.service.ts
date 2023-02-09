import { Injectable } from "@nestjs/common";
import CreateReportDto from "./dto/createReportDto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import Report from "./report.entity";
import User from "../users/user.entity";
@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create({ ...reportDto, user });
        return this.repo.save(report);
    }
}
