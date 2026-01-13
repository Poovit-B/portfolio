import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Job Opportunity' })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ example: 'Hello, I would like to...' })
  @IsString()
  @IsNotEmpty()
  message: string;
}

