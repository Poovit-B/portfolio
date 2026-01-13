import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('page_views')
@Index(['createdAt'])
@Index(['path'])
export class PageView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  device: string;

  @Column({ nullable: true })
  country: string;

  @Column()
  ip: string;

  @Column({ nullable: true })
  sessionId: string;

  @CreateDateColumn()
  createdAt: Date;
}

