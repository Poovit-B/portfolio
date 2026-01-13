import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { ContactService } from './contact.service';
import { SendMessageDto } from './dto/contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  private getClientIP(request: Request): string {
    const forwarded = request.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return request.ip || request.socket.remoteAddress || 'unknown';
  }

  @Post()
  @ApiOperation({ summary: 'Send contact message (public)' })
  async sendMessage(@Body() dto: SendMessageDto, @Req() request: Request) {
    const ip = this.getClientIP(request);
    const message = await this.contactService.sendMessage(dto, ip);
    return {
      success: true,
      message: 'Message sent successfully',
      id: message.id,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all messages (admin only)' })
  async getAllMessages(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page || '1');
    const limitNum = parseInt(limit || '20');
    return this.contactService.getAllMessages(pageNum, limitNum);
  }

  @Get('unread')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get unread message count (admin only)' })
  async getUnreadCount() {
    const count = await this.contactService.getUnreadCount();
    return { unreadCount: count };
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark message as read (admin only)' })
  async markAsRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete message (admin only)' })
  async deleteMessage(@Param('id') id: string) {
    return this.contactService.deleteMessage(id);
  }
}

