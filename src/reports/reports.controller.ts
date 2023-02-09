import {
    Controller,
    Patch,
    Post,
    Body,
    UseGuards,
    Param,
    Get,
    Query,
} from "@nestjs/common";
import CreateReportDto from "./dto/createReport.dto";
import { ReportsService } from "./reports.service";
import AuthGuard from "../guards/auth.guard";
import CurrentUser from "../users/decorators/currentUser.decorator";
import User from "../users/user.entity";
import ReportDto from "./dto/report.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import ApproveReportDto from "./dto/approveReport.dto";
import AdminGuard from "../guards/admin.guard";
import GetEstimateDto from "./dto/getEstimate.dto";

@Controller("reports")
export class ReportsController {
    constructor(private reportService: ReportsService) {}

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportService.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Patch("/:id")
    @UseGuards(AdminGuard)
    approveReport(@Param("id") id: string, @Body() body: ApproveReportDto) {
        return this.reportService.changeApproval(id, body.approved);
    }
}
