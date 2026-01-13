import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('click_events')
@Index(['createdAt'])
@Index(['elementId'])
export class ClickEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  elementId: string;

  @Column({ nullable: true })
  elementText: string;

  @Column({ nullable: true })
  elementType: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  href: string;

  @Column()
  ip: string;

  @Column({ nullable: true })
  sessionId: string;

  @CreateDateColumn()
  createdAt: Date;
}

