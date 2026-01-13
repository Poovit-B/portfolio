import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import * as UAParser from 'ua-parser-js';
import { PageView } from '../../entities/page-view.entity';
import { ClickEvent } from '../../entities/click-event.entity';
import { TrackPageViewDto, TrackClickDto } from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(PageView)
    private pageViewRepository: Repository<PageView>,
    @InjectRepository(ClickEvent)
    private clickEventRepository: Repository<ClickEvent>,
  ) {}

  async trackPageView(dto: TrackPageViewDto, ip: string, userAgent: string) {
    const parser = new UAParser.UAParser(userAgent);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    const pageView = this.pageViewRepository.create({
      path: dto.path,
      referrer: dto.referrer,
      userAgent,
      browser: browser.name,
      os: os.name,
      device: device.type || 'desktop',
      ip,
      sessionId: dto.sessionId,
    });

    return this.pageViewRepository.save(pageView);
  }

  async trackClick(dto: TrackClickDto, ip: string) {
    const clickEvent = this.clickEventRepository.create({
      ...dto,
      ip,
    });

    return this.clickEventRepository.save(clickEvent);
  }

  async getDashboardStats(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total page views
    const totalViews = await this.pageViewRepository.count({
      where: { createdAt: MoreThanOrEqual(startDate) },
    });

    // Unique visitors
    const uniqueVisitorsResult = await this.pageViewRepository
      .createQueryBuilder('pv')
      .select('COUNT(DISTINCT pv.ip)', 'count')
      .where('pv.createdAt >= :startDate', { startDate })
      .getRawOne();

    // Total clicks
    const totalClicks = await this.clickEventRepository.count({
      where: { createdAt: MoreThanOrEqual(startDate) },
    });

    // Views by page
    const viewsByPage = await this.pageViewRepository
      .createQueryBuilder('pv')
      .select('pv.path', 'path')
      .addSelect('COUNT(*)', 'count')
      .where('pv.createdAt >= :startDate', { startDate })
      .groupBy('pv.path')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    // Views by day
    const viewsByDay = await this.pageViewRepository
      .createQueryBuilder('pv')
      .select("TO_CHAR(pv.createdAt, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('pv.createdAt >= :startDate', { startDate })
      .groupBy("TO_CHAR(pv.createdAt, 'YYYY-MM-DD')")
      .orderBy('date', 'ASC')
      .getRawMany();

    // Top clicked elements
    const topClicks = await this.clickEventRepository
      .createQueryBuilder('ce')
      .select('ce.elementId', 'elementId')
      .addSelect('ce.elementText', 'elementText')
      .addSelect('COUNT(*)', 'count')
      .where('ce.createdAt >= :startDate', { startDate })
      .groupBy('ce.elementId')
      .addGroupBy('ce.elementText')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    // Browser stats
    const browserStats = await this.pageViewRepository
      .createQueryBuilder('pv')
      .select('pv.browser', 'browser')
      .addSelect('COUNT(*)', 'count')
      .where('pv.createdAt >= :startDate', { startDate })
      .andWhere('pv.browser IS NOT NULL')
      .groupBy('pv.browser')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();

    // Device stats
    const deviceStats = await this.pageViewRepository
      .createQueryBuilder('pv')
      .select('pv.device', 'device')
      .addSelect('COUNT(*)', 'count')
      .where('pv.createdAt >= :startDate', { startDate })
      .groupBy('pv.device')
      .orderBy('count', 'DESC')
      .getRawMany();

    // Recent visitors
    const recentVisitors = await this.pageViewRepository.find({
      order: { createdAt: 'DESC' },
      take: 20,
      select: ['id', 'path', 'browser', 'os', 'device', 'ip', 'createdAt'],
    });

    return {
      summary: {
        totalViews,
        uniqueVisitors: parseInt(uniqueVisitorsResult?.count || '0'),
        totalClicks,
        avgViewsPerDay: days > 0 ? Math.round(totalViews / days) : 0,
      },
      viewsByPage,
      viewsByDay,
      topClicks,
      browserStats,
      deviceStats,
      recentVisitors,
    };
  }

  async getRealTimeStats() {
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    const activeVisitorsResult = await this.pageViewRepository
      .createQueryBuilder('pv')
      .select('COUNT(DISTINCT pv.ip)', 'count')
      .where('pv.createdAt >= :fiveMinutesAgo', { fiveMinutesAgo })
      .getRawOne();

    const recentPages = await this.pageViewRepository
      .createQueryBuilder('pv')
      .select('pv.path', 'path')
      .addSelect('COUNT(*)', 'count')
      .where('pv.createdAt >= :fiveMinutesAgo', { fiveMinutesAgo })
      .groupBy('pv.path')
      .orderBy('count', 'DESC')
      .getRawMany();

    return {
      activeVisitors: parseInt(activeVisitorsResult?.count || '0'),
      recentPages,
    };
  }
}

