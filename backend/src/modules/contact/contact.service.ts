import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { SendMessageDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async sendMessage(dto: SendMessageDto, ip: string) {
    const message = this.messageRepository.create({
      ...dto,
      ip,
    });

    return this.messageRepository.save(message);
  }

  async getAllMessages(page: number = 1, limit: number = 20) {
    const [messages, total] = await this.messageRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUnreadCount() {
    return this.messageRepository.count({ where: { read: false } });
  }

  async markAsRead(id: string) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.read = true;
    return this.messageRepository.save(message);
  }

  async deleteMessage(id: string) {
    const result = await this.messageRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Message not found');
    }

    return { success: true };
  }
}

