import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  subject: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  read: boolean;

  @Column({ nullable: true })
  ip: string;

  @CreateDateColumn()
  createdAt: Date;
}

