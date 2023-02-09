import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import CreateReportDto from "./dto/createReportDto";
import { ReportsService } from "./reports.service";
import AuthGuard from "../guards/auth.guard";
import CurrentUser from "../users/decorators/currentUser.decorator";
import User from "../users/user.entity";
import ReportDto from "./dto/reportDto";
import { Serialize } from "../interceptors/serialize.interceptor";
@Controller("reports")
export class ReportsController {
    constructor(private reportService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }
}
