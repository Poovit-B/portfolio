import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackPageViewDto {
  @ApiProperty({ example: '/' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiPropertyOptional({ example: 'https://google.com' })
  @IsString()
  @IsOptional()
  referrer?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sessionId?: string;
}

export class TrackClickDto {
  @ApiProperty({ example: 'contact-btn' })
  @IsString()
  @IsNotEmpty()
  elementId: string;

  @ApiPropertyOptional({ example: 'Contact Me' })
  @IsString()
  @IsOptional()
  elementText?: string;

  @ApiPropertyOptional({ example: 'button' })
  @IsString()
  @IsOptional()
  elementType?: string;

  @ApiProperty({ example: '/' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiPropertyOptional({ example: 'https://github.com/poovit' })
  @IsString()
  @IsOptional()
  href?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sessionId?: string;
}

