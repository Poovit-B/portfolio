import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AnalyticsService } from './analytics.service';
import { TrackPageViewDto, TrackClickDto } from './dto/analytics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  private getClientIP(request: Request): string {
    const forwarded = request.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return request.ip || request.socket.remoteAddress || 'unknown';
  }

  @Post('track/pageview')
  @ApiOperation({ summary: 'Track page view (public)' })
  async trackPageView(
    @Body() dto: TrackPageViewDto,
    @Req() request: Request,
    @Headers('user-agent') userAgent: string,
  ) {
    const ip = this.getClientIP(request);
    const pageView = await this.analyticsService.trackPageView(
      dto,
      ip,
      userAgent,
    );
    return { success: true, id: pageView.id };
  }

  @Post('track/click')
  @ApiOperation({ summary: 'Track click event (public)' })
  async trackClick(@Body() dto: TrackClickDto, @Req() request: Request) {
    const ip = this.getClientIP(request);
    const clickEvent = await this.analyticsService.trackClick(dto, ip);
    return { success: true, id: clickEvent.id };
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get dashboard stats (admin only)' })
  async getDashboardStats(@Query('days') days?: string) {
    const daysNum = parseInt(days || '30');
    return this.analyticsService.getDashboardStats(daysNum);
  }

  @Get('realtime')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get real-time stats (admin only)' })
  async getRealTimeStats() {
    return this.analyticsService.getRealTimeStats();
  }
}

