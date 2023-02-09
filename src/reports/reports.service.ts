import { Injectable, NotFoundException } from "@nestjs/common";
import CreateReportDto from "./dto/createReport.dto";
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
    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
        if (!report) {
            throw new NotFoundException("Report not found");
        }
        report.approved = approved;
        return this.repo.save(report);
    }
}
